/**
 *
 * CitiesGraphic
 *
 * This is the top-level component for the entire graphic.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import FilterPanel from './FilterPanel';
import GraphicComponent from './graphic/GraphicComponent';
import {fetchData} from '../actions/AppActions';

class CitiesGraphic extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    return (
      <div className="wrapper">
        <FilterPanel />
        <GraphicComponent />
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select() {
  return {};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CitiesGraphic);
