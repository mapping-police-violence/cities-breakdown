import _ from 'underscore';
import d3 from 'd3';

import { ALL_RACES } from '../../constants/AppConstants';

class Graphic {
    constructor(el, data) {
      this.el = el;
      this.width = this.el.clientWidth;
      this.height = this.el.clientHeight;
      let margin = this._getMargin();

      this.svg = d3.select(this.el).append('svg')
          .attr('class', 'd3-graphic')
          .attr('height', this.height)
          .attr('width', this.width);

      this.svg.append('g')
          .attr('class', 'svg-container')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      this.color = d3.scale.ordinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'])
        .domain(ALL_RACES);
      this.update(data);
      console.log('graphic instantiated');
    }

  update(data) {
    this.data = this._transformData(data);
    let x = d3.scale.linear()
        .rangeRound([this.width, 0]);
    let y = d3.scale.ordinal()
        .rangeRoundBands([0, this.height], 0.1);
    let xAxis = d3.svg.axis()
        .scale(x)
        .orient('top')
        .tickFormat(d3.format('.2s'));
    let yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    console.log('update called with', data);
  }

  destroy() {
    console.log('destroy called');
  }

  _getMargin() {
    return { top: 20, right: 20, bottom: 20, left: 20 };
  }

  _getXDomain() {
    return [];
  }

  _transformData(data) {
    if (!data) {
      return [];
    }
    let groupedData = _.groupBy(data, 'Agency responsible for death');
  }
}


export default Graphic;
