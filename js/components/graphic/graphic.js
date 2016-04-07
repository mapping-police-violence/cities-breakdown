import d3 from 'd3';
import groupBy from 'lodash.groupby';

import { ALL_RACES } from '../../constants/AppConstants';

class Graphic {
  constructor(el, data) {
    console.log(el);
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

    this.group.append('g')
      .attr('class', 'x axis');
    this.group.append('g')
      .attr('class', 'y axis');

    this.update(data);
  }

  update(data) {
    if (!data) {
      return;
    }

    this.data = this._transformData(data);
    const rowHeight = this._getRowHeight();
    this.innerHeight = this.data.length * rowHeight;
    this.svg.attr('height', this.innerHeight + this.margin.top + this.margin.bottom);

    let x = this._getXAxis();
    let y = this._getYAxis();
    this._updateAxes(x, y);

    let policeDepartments = this.group.selectAll('.pd').data(this.data);
    policeDepartments.enter()
      .append('g')
      .attr('class', 'pd');
    policeDepartments
      .attr('transform', (d) => `translate(${this.innerWidth / 3}, ${y(d.label)})`);
    policeDepartments.exit().remove();
    this._renderPoliceDepartments(policeDepartments);
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
    const transformedData = data.map((datum) => {
      let group = this._transformGroup(datum.murders);
      group.label = datum.city.police_department;
      group.city = datum.city;
      return group;
    });
    return transformedData.sort((a, b) => b.total - a.total);
  }

  _transformGroup(data) {
    if (!data) {
      return {
        data: [],
        total: 0
      };
    }
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
    });
    return {
      data: formattedData,
      total: formattedData.length ? formattedData[formattedData.length - 1].x1 : 0
    };
  }

  _getRowHeight() {
    return 15;
  }

  _getXAxis() {
    return d3.scale.linear()
      .domain([0, d3.max(this.data.map((d) => d.total))])
      .rangeRound([0, this.innerWidth * 2 / 3]);
  }

  _getYAxis() {
    return d3.scale.ordinal()
      .domain(this.data.map((d) => d.label))
      .rangeRoundBands([0, this.innerHeight], 0.1, 0.05);
  }

  _updateAxes(x, y) {
    let xAxis = d3.svg.axis()
      .scale(x)
      .orient('top')
      .tickFormat(d3.format('.2s'));
    let yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    d3.selectAll('g.x.axis')
      .attr('transform', `translate(${this.innerWidth / 3}, 0)`)
      .call(xAxis);

    d3.selectAll('g.y.axis')
      .attr('transform', `translate(${this.innerWidth / 3}, 0)`)
      .call(yAxis);
  }

  _renderPoliceDepartments(policeDepartments) {
    const y = this._getYAxis();
    const x = this._getXAxis();
    let victims = policeDepartments.selectAll('rect').data((d) => d.data);
    victims.enter()
      .append('rect')
      .attr('class', (d) => `race ${d.label}`)
      .attr('height', y.rangeBand());
    victims
      .attr('width', (d) => x(d.x1) - x(d.x0))
      .attr('x', (d) => x(d.x0))
      .style('fill', (d) => this.color(d.label));
    victims.exit().remove();
  }
}


export default Graphic;
