import Graphic from './graphic';
import countBy from 'lodash.countby';
import d3 from 'd3';

const populationFormatter = d3.format(',d');
const rateFormatter = d3.format('.2r');

export default class RateGraphic extends Graphic {
  _transformData(data) {
    return data.map((datum) => {
      const raceCounts = countBy(datum.murders, 'victim_race');
      const blackHomicides = raceCounts.Black || 0;
      const totalPoliceHomicides = datum.murders ? datum.murders.length : 0;
      const whitePoliceHomicides = raceCounts.White || 0;
      const nonBlackPopulation = (datum.city.total - datum.city.black);
      const nonBlackPoliceHomicides = totalPoliceHomicides - blackHomicides;
      const blackPoliceHomicideRate = blackHomicides / (datum.city.black / 10000);
      const totalPoliceHomicideRate = totalPoliceHomicides / (datum.city.total / 10000);
      const nonBlackRate = nonBlackPoliceHomicides / ( nonBlackPopulation / 10000);
      const whitePoliceHomicideRate = whitePoliceHomicides / (datum.city.white / 10000);
      const nonWhitePoliceHomicideRate =
          (totalPoliceHomicides - whitePoliceHomicides) / ((datum.city.total - datum.city.white) / 10000);
      return {
        label: datum.city.police_department,
        total: totalPoliceHomicideRate,
        data: [{
          rate: blackPoliceHomicideRate,
          type: 'black',
          department: datum.city.police_department,
          population: datum.city.black
        }, {
          rate: nonBlackRate,
          type: 'nonblack',
          department: datum.city.police_department,
          population: nonBlackPopulation
        }]
      };
    }).sort((a, b) => b.total - a.total);
  }

  _renderPoliceDepartments(departments) {
    const y = this._getYAxis();
    const x = this._getXAxis();
    const rateHeight = y.rangeBand() / 2 - 1;
    let rates = departments
      .attr('data-department', (d) => d.label)
      .selectAll('rect')
      .data((d) => d.data);

    rates.enter()
      .append('rect')
      .attr('class', (d) => `rate ${d.type}`)
      .attr('height', rateHeight)
      .attr('transform', (d) => `translate(0, ${d.type === 'black' ? rateHeight + 2 : 0})`)
      .on('mouseover', this._onMouseover.bind(this))
      .on('mousemove', this._onMouseover.bind(this))
      .on('touchstart', this._onMouseover.bind(this))
      .on('touchmove', this._onMouseover.bind(this))
      .on('mouseout', this._onMouseout.bind(this));
    rates
      .attr('width', (d) => x(d.rate))
      .attr('x', 0)
      .style('fill', (d) => this.color(d.type));
    rates.exit().remove();
  }

  _getXAxis() {
    return d3.scale.linear()
      .domain([0, 2])
      .rangeRound([0, this.innerWidth * 2 / 3]);
  }

  _getRowHeight() {
    return 30;
  }

  _getLegendText() {
    return 'The number of people, out of 10,000, that have been killed by the police in each city. Comparing the rate of black victims to nonblack victims. Population estimates are taken from the 2010 census. Departments are sorted by the total homicide rate.';
  }

  _getLegendLabels() {
    /* eslint-disable arrow-body-style */
    return ['Black', 'Nonblack'].map((race) => {
      return {
        label: race,
        color: this.color(race.toLowerCase())
      };
    });
    /* eslint-enable */
  }

  _getTooltip(d) {
    return `${d.department} has killed <strong>${rateFormatter(d.rate)}</strong> per 10,000 of the ${populationFormatter(d.population)} of <strong>${d.type}</strong> residents.`
  }
}
