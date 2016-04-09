/**
 *
 * CitiesGraphic
 *
 * This is the top-level component for the entire graphic.
 */

import React, {Component} from 'react';

import FilterPanel from './FilterPanel';
import GraphicComponent from './graphic/GraphicComponent';

export default class CitiesGraphic extends Component {
  render() {
    return (
      <div className="wrapper">
        <FilterPanel />
        <GraphicComponent />
      </div>
    );
  }
}
