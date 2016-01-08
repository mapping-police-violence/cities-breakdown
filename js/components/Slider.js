import React from 'react';
import { connect } from 'react-redux';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

const tipFormatter = function(value) {
  return value.toLocaleString();
}

const CustomizedRange = React.createClass({
  render() {
    return (
      <div className="slider-container">
        <div className="group">
          <span className="pull-left">{0}</span>
          <span className="pull-right">{tipFormatter(Math.ceil(this.props.max))}</span>
        </div>
        <RcSlider
            range
            allowCross={false}
            defaultValue={this.props.value}
            onAfterChange={this.props.onChange}
            min={0}
            max={Math.ceil(this.props.max)}
            tipFormatter={tipFormatter} />
      </div>
    );
  },
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (value) => {
      dispatch(ownProps.onChange(value))
    }
  }
}

export default connect(null, mapDispatchToProps)(CustomizedRange);

