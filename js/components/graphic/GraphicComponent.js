import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import groupBy from 'lodash.groupby';

import Graphic from './graphic';

class GraphicComponent extends Component {
  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    this.graphic = new Graphic(el, filterData(this.props.data, this.props.filter).murders);
  }

  componentDidUpdate() {
    this.graphic.update(filterData(this.props.data, this.props.filter).murders);
  }

  render() {
    return (
      <div className="graphic-container"></div>
    );
  }

  componentWillUnmount() {
    this.graphic.destroy();
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

function filterData(data, filter) {
  if (!data.cities || !data.murders) {
    return {};
  }

  let cities = data.cities.filter(filterCities(filter));
  let murders = data.murders.filter(filterMurders(cities));
  murders = groupBy(murders, 'agency_responsible');
  return {
    cities,
    murders
  };
}

function select(state) {
  return {
    data: state.data,
    filter: state.filter
  };
}

export default connect(select)(GraphicComponent);
