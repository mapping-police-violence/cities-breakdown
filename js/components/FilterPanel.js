import React, {Component} from 'react';
import {connect} from 'react-redux';
import FilterPanelControl from './FilterPanelControl';
import Slider from './Slider';
import StateSelector from './StateSelector';
import {
  changeCityPrefix,
  changeCrimeRate,
  changeMurderRate,
  changePopulation,
  changeState,
} from '../actions/AppActions';

class FilterPanel extends Component {
  render() {
    return (
      <div className="filter-panel">
        <FilterPanelControl label="Search for your city">
          <input onChange={this.props.onCityPrefixChange} />
        </FilterPanelControl>
        <FilterPanelControl label="Filter by state">
          <StateSelector onChange={this.props.onStateChange} />
        </FilterPanelControl>
        <FilterPanelControl label="Filter by Murder Rate">
          <Slider
            defaultValue={this.props.murderRate}
            onAfterChange={this.props.onMurderRateChange}
            max={this.props.maxPossibleMurderRate} />
        </FilterPanelControl>
        <FilterPanelControl label="Filter by Crime Rate">
          <Slider
            defaultValue={this.props.crimeRate}
            onAfterChange={this.props.onCrimeRateChange}
            max={this.props.maxPossibleCrimeRate} />
        </FilterPanelControl>
        <FilterPanelControl label="Filter by Population">
          <Slider
            defaultValue={this.props.population}
            onAfterChange={this.props.onPopulationChange}
            max={this.props.maxPossiblePopulation} />
        </FilterPanelControl>
        <table>
          <tbody>
            <tr>
              <th> Crime Rate </th>
              <th> Murder Rate </th>
              <th> Population </th>
              <th> State </th>
              <th> City </th>
            </tr>
            <tr>
              <td>{this.props.crimeRate[0] + ' - ' + this.props.crimeRate[1]}</td>
              <td>{this.props.murderRate[0] + ' - ' + this.props.murderRate[1]}</td>
              <td>{this.props.population[0] + ' - ' + this.props.population[1]}</td>
              <td>{this.props.state}</td>
              <td>{this.props.city}</td>
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

function mapDispatchToProps(dispatch) {
  return {
    onStateChange(event) {
      dispatch(changeState(event.target.value));
    },

    onCityPrefixChange(event) {
      dispatch(changeCityPrefix(event.target.value));
    },

    onCrimeRateChange(rate) {
      dispatch(changeCrimeRate(rate));
    },

    onMurderRateChange(rate) {
      dispatch(changeMurderRate(rate));
    },

    onPopulationChange(population) {
      dispatch(changePopulation(population));
    }
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select, mapDispatchToProps)(FilterPanel);
