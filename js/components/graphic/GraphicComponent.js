import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupBy from 'lodash.groupby';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import TotalsGraphic from './graphic';
import UnarmedGraphic from './unarmedgraphic';
import RateGraphic from './rategraphic';
import { selectTab } from '../../actions/AppActions';

import murdersRaw from '../../../data/filtered.csv';
import citiesRaw from '../../../data/cities.csv';


class GraphicComponent extends Component {
  constructor(props) {
    super(props);
    this.graphicMap = {
      0: {
        Class: RateGraphic,
      },
      1: {
        Class: TotalsGraphic,
      },
      2: {
        Class: UnarmedGraphic,
      }
    };
  }

  componentDidMount() {
    const data = filterData(citiesRaw, murdersRaw, this.props.filter);
    this.getSelectedTabInstance().update(data);
  }

  componentDidUpdate() {
    const data = filterData(citiesRaw, murdersRaw, this.props.filter);
    this.getSelectedTabInstance().update(data);
  }

  componentWillUnmount() {
    this.graphic.destroy();
  }

  render() {
    const { filter: { selectedTab } } = this.props;
    return (
      <Tabs onSelect={this.tabSelected.bind(this)}
          selectedIndex={selectedTab}
          forceRenderTabPanel={true}>
        <TabList>
          <Tab>Police Homicide Rate</Tab>
          <Tab>Total Police Homicides</Tab>
          <Tab>Unarmed Victims</Tab>
        </TabList>
        <TabPanel>
          <div className={'homicide-rate'} ref={(div) => this.graphicMap[0].el = div} />
        </TabPanel>
        <TabPanel>
          <div className={'homicide-totals'} ref={(div) => this.graphicMap[1].el = div} />
        </TabPanel>
        <TabPanel>
          <div className={'unarmed'} ref={(div) => this.graphicMap[2].el = div} />
        </TabPanel>
      </Tabs>
    );
  }

  tabSelected(tab) {
    this.props.dispatch(selectTab(tab));
  }


  getSelectedTabInstance() {
    const { filter: { selectedTab } } = this.props;
    if (!this.graphicMap[selectedTab].instance) {
      this.graphicMap[selectedTab].instance = new this.graphicMap[selectedTab].Class(
          this.graphicMap[selectedTab].el);
    }
    return this.graphicMap[selectedTab].instance;
  }
}

function filterCities(filter) {
  return (city) => {
    if (city.violent_crime_rate < filter.crimeRate[0]
        || city.violent_crime_rate > filter.crimeRate[1]) {
      return false;
    }

    if (city.murder_rate < filter.murderRate[0] || city.murder_rate > filter.murderRate[1]) {
      return false;
    }

    if (city.total < filter.population[0] || city.total > filter.population[1]) {
      return false;
    }

    if (filter.state && filter.state !== city.state_name.toLowerCase()) {
      return false;
    }

    if (filter.city && city.city.toLowerCase().indexOf(filter.city) === -1) {
      return false;
    }

    return true;
  };
}

function filterMurders(cities) {
  const cityNames = cities.map((city) => `${city.city}, ${city.state}`);

  return (murder) => cityNames.indexOf(`${murder.city}, ${murder.state}`) !== -1;
}

function filterData(citiesData, murdersData, filter) {
  let cities = citiesData.filter(filterCities(filter));
  let murders = murdersData.filter(filterMurders(cities));
  murders = groupBy(murders, 'agency_responsible');
  cities = cities.map((city) => {
    return {
      city,
      murders: murders[city.police_department]
    };
  });

  console.log(cities);

  return cities;
}

function select(state) {
  return {
    filter: state.filter
  };
}

export default connect(select)(GraphicComponent);
