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

    this.legend = d3.select(this.el).append('div')
      .attr('class', 'legend');
    this.legend.append('p')
      .text(this._getLegendText());

    this.legend.append('div')
      .attr('class', 'color-swatches');

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

    this.tooltip = d3.select(this.el).append('div')
      .attr('class', 'tooltip');

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

    this._updateLegend();

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
    console.log(groupBy(data, (d) => d.city.city));
    const transformedData = data.map((datum) => {
      let group = this._transformGroup(datum);
      group.label = datum.city.police_department;
      group.city = datum.city;
      return group;
    });
    return transformedData.sort((a, b) => b.total - a.total);
  }

  _transformGroup(datum) {
    if (!datum || !datum.murders) {
      return {
        data: [],
        total: 0
      };
    }
    const data = datum.murders;
    let races = groupBy(data, 'victim_race');
    let x0 = 0;
    const sortedKeys =
        Object.keys(races).sort((a, b) => ALL_RACES.indexOf(a) - ALL_RACES.indexOf(b));
    const formattedData = sortedKeys.map((race) => {
      const obj = {
        x0: x0,
        x1: x0 + races[race].length,
        label: race,
        department: datum.city.police_department,
        count: races[race].length
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
      .rangeBands([0, this.innerHeight], 0.1, 0.05);
  }

  _getLegendText() {
    return 'The total number of police homicides in each city, broken down by race.';
  }

  _updateAxes(x, y) {
    let xAxis = d3.svg.axis()
      .scale(x)
      .orient('top')
      .tickFormat(d3.format('.f'));
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

  _getLegendLabels() {
    const racesFound = new Set([]);

    this.data.forEach((pd) => {
      pd.data.forEach((race) => racesFound.add(race.label));
    });

    /* eslint-disable arrow-body-style */
    return ALL_RACES.map((race) => {
      if (!racesFound.has(race)) {
        return false;
      }

      return {
        label: race,
        color: this.color(race)
      };
    }).filter((d) => Boolean(d));
    /* eslint-enable */
  }

  _updateLegend() {
    const labels = this.legend.select('.color-swatches').selectAll('.legend-label')
      .data(this._getLegendLabels());
    const labelContainers = labels.enter().append('div')
      .attr('class', 'legend-label');
    labelContainers.append('span')
      .attr('class', 'swatch')
      .style('background-color', (d) => d.color);
    labelContainers.append('span')
      .attr('class', 'label-text')
      .text((d) => d.label);
    labels.exit().remove();
  }

  _renderPoliceDepartments(policeDepartments) {
    const y = this._getYAxis();
    const x = this._getXAxis();
    let victims = policeDepartments.selectAll('rect').data((d) => d.data);
    victims.enter()
      .append('rect')
      .attr('class', (d) => `race ${d.label}`)
      .attr('height', y.rangeBand())
      .on('mouseover', this._onMouseover.bind(this))
      .on('mousemove', this._onMouseover.bind(this))
      .on('touchstart', this._onMouseover.bind(this))
      .on('touchmove', this._onMouseover.bind(this))
      .on('mouseout', this._onMouseout.bind(this));
    victims
      .attr('width', (d) => x(d.x1) - x(d.x0))
      .attr('x', (d) => x(d.x0))
      .style('fill', (d) => this.color(d.label));
    victims.exit().remove();
  }

  _onMouseover(d) {
    if (this.tooltipTimeout) {
      window.clearTimeout(this.tooltipTimeout);
    }

    this.tooltip
      .style({
        opacity: 1,
        top: d3.event.clientY + 'px',
        left: d3.event.clientX + 'px'
      })
      .html(this._getTooltip(d));
  }

  _onMouseout() {
    this.tooltipTimeout = window.setTimeout(() => {
      this.tooltip.style({ opacity: 0 });
    }, 200);
  }

  _getTooltip(d) {
    return `${d.department} has killed ${d.count} ${d.label.toLowerCase()} people.`;
  }
}


export default Graphic;
