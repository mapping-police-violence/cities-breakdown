import React from 'react';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

function tipFormatter(value) {
  return value.toLocaleString();
}

const CustomizedRange = React.createClass({
  render() {
    return (
      <div className="slider-container">
        <RcSlider
            {...this.props}
            range
            allowCross={false}
            min={0}
            max={Math.ceil(this.props.max)}
            tipFormatter={tipFormatter} />
        <div className="group">
          <span className="pull-left slider-label">{0}</span>
          <span className="pull-right slider-label">{tipFormatter(Math.ceil(this.props.max))}</span>
        </div>
      </div>
    );
  },
});

export default CustomizedRange;
