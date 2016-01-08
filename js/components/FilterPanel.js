import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterPanelControl from './FilterPanelControl';
import Slider from './Slider';
import {
  changeState,
  changeCityPrefix,
  changeCrimeRate,
  changeMurderRate,
  changePopulation,
  toggleRace,
} from '../actions/AppActions';

let onChangeAction = (value) => console.log(value)

class FilterPanel extends Component {
  render() {
    return (
      <div className="filter-panel">
        <FilterPanelControl label="Filter by Murder Rate">
          <Slider
            value={this.props.murderRate}
            onChange={changeMurderRate}
            max={this.props.maxPossibleMurderRate} />
        </FilterPanelControl>
        <FilterPanelControl label="Filter by Crime Rate">
          <Slider
            value={this.props.crimeRate}
            onChange={changeCrimeRate}
            max={this.props.maxPossibleCrimeRate} />
        </FilterPanelControl>
        <FilterPanelControl label="Filter by Population">
          <Slider
            value={this.props.population}
            onChange={changePopulation}
            max={this.props.maxPossiblePopulation} />
        </FilterPanelControl>
        <table>
          <tbody>
            <tr>
              <th> Crime Rate </th>
              <th> Murder Rate </th>
              <th> Population </th>
            </tr>
            <tr>
              <td>{this.props.crimeRate[0] + ' - ' + this.props.crimeRate[1]}</td>
              <td>{this.props.murderRate[0] + ' - ' + this.props.murderRate[1]}</td>
              <td>{this.props.population[0] + ' - ' + this.props.population[1]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return state.filter;
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(FilterPanel);
