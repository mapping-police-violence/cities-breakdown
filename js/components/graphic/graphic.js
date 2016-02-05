import d3 from 'd3';
import groupBy from 'lodash.groupby';

import { ALL_RACES } from '../../constants/AppConstants';

class Graphic {
    constructor(el, data) {
      this.el = el;
      this.width = this.el.clientWidth;
      this.height = this.el.clientHeight;
      this.margin = this._getMargin();
      this.innerWidth = this.width - this.margin.left - this.margin.right;

      this.svg = d3.select(this.el).append('svg')
          .attr('class', 'd3-graphic')
          .attr('width', this.width);

      this.group = this.svg.append('g')
            .attr('class', 'svg-container')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

      this.color = d3.scale.ordinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'])
        .domain(ALL_RACES);

      this.update(data);
      console.log('graphic instantiated');
    }

  update(data) {
    if (!data) {
      return;
    }

    this.data = this._transformData(data);
    const rowHeight = 15;
    this.innerHeight = this.data.length * rowHeight;
    this.svg.attr('height', this.innerHeight + this.margin.top + this.margin.bottom);

    let x = d3.scale.linear()
        .domain([0, d3.max(this.data.map((d) => d.total))])
        .rangeRound([0, this.innerWidth * 2 / 3]);
    let y = d3.scale.ordinal()
        .domain(this.data.map((d) => d.label))
        .rangeRoundBands([0, this.innerHeight], 0.1, 0.05);
    let xAxis = d3.svg.axis()
        .scale(x)
        .orient('top')
        .tickFormat(d3.format('.2s'));
    let yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    this.group.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(${this.innerWidth / 3}, 0)`)
        .call(xAxis);

    this.group.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${this.innerWidth / 3}, 0)`)
        .call(yAxis);

    let policeDepartments = this.group.selectAll('.pd')
        .data(this.data)
        .enter()
        .append('g')
          .attr('class', 'pd')
          .attr('transform', (d) => `translate(${this.innerWidth / 3}, ${y(d.label)})`);

    let victims = policeDepartments.selectAll('rect')
        .data((d) => d.data)
        .enter()
        .append('rect')
          .attr('class', (d) => `race ${d.label}`)
          .attr('height', y.rangeBand())
          .attr('width', (d) => x(d.x1) - x(d.x0))
          .attr('x', (d) => x(d.x0))
          .style('fill', (d) => this.color(d.label));

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
    const transformedData = Object.keys(data).map((key) => {
      let group = this._transformGroup(data[key]);
      group.label = key;
      return group;
    });
    return transformedData.sort((a, b) => b.total - a.total);
  }

  _transformGroup(data) {
    let races = groupBy(data, 'victim_race');
    let x0 = 0;
    const sortedKeys =
        Object.keys(races).sort((a, b) => ALL_RACES.indexOf(a) - ALL_RACES.indexOf(b));
    const formattedData = sortedKeys.map((race) => {
      const obj = {
        x0: x0,
        x1: x0 + races[race].length,
        label: race
      };
      x0 = obj.x1;
      return obj;
    })
    return {
      data: formattedData,
      total: formattedData[formattedData.length - 1].x1
    };
  }
}


export default Graphic;
