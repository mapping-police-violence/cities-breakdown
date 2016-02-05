import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import groupBy from 'lodash.groupby';

import Graphic from './graphic';
import { fetchData } from '../../actions/AppActions';

class GraphicComponent extends Component {
  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    this.graphic = new Graphic(el, filterData(this.props.data, this.props.filter).murders);
    fetchData();
  }

  componentDidUpdate() {
    console.log('updated');
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
    return true;
  };
}

function filterMurders(cities) {
  return (murder) => {
    return true;
  };
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
