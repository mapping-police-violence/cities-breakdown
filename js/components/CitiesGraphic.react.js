/**
 *
 * CitiesGraphic
 *
 * This is the top-level component for the entire graphic.
 */

import {Component} from 'react';
import {connect} from 'react-redux';
import FilterPanel from './FilterPanel';

class CitiesGraphic extends Component {
  render() {
    return (
      <div className="wrapper">
        <FilterPanel />
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(CitiesGraphic);
