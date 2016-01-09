import React, {Component} from 'react';
import STATES from '../constants/States';


class StateSelector extends Component {
  render() {
    let options = [<option value="" key="">Select a state</option>];

    options = [...options, ...Object.keys(STATES).map(
      (state) => <option value={STATES[state]} key={state}>{STATES[state]}</option>)];
    return (
      <select className="select" name="StateSelector" {...this.props}>{options}</select>
    );
  }
}

export default StateSelector;
