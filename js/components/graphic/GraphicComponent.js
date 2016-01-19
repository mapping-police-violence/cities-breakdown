import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Graphic from './graphic';
import { fetchData } from '../../actions/AppActions';

class GraphicComponent extends Component {
  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
    this.graphic = new Graphic(el, filterData(this.props.data, this.props.filter));
    fetchData();
  }

  componentDidUpdate() {
    console.log('updated');
    this.graphic.update(this.props.data);
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

function filterData(data, filter) {
  return data;
}

function select(state) {
  return {
    data: state.data,
    filter: state.filter
  };
}

export default connect(select)(GraphicComponent);
