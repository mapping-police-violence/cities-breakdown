import {Component} from 'react';

class FilterPanelControl extends Component {
  render() {
    return (
      <div className="filter-panel-control">
        <h4 className="label">
          {this.props.label}
        </h4>
        {this.props.children}
      </div>
    );
  }
}

export default FilterPanelControl;
