import Graphic from './graphic';
import countBy from 'lodash.countby';


export default class RateGraphic extends Graphic {
  _transformData(data) {
    return data.map((datum) => {
      const raceCounts = countBy(datum.murders, 'victim_race');
      const blackHomicides = raceCounts.Black || 0;
      const totalPoliceHomicides = datum.murders ? datum.murders.length : 0;
      const whitePoliceHomicides = raceCounts.White || 0;
      const nonBlackPoliceHomicides = totalPoliceHomicides - blackHomicides;
      const blackPoliceHomicideRate = blackHomicides / (datum.city.black / 10000);
      const totalPoliceHomicideRate = totalPoliceHomicides / (datum.city.total / 10000);
      const nonBlackRate = nonBlackPoliceHomicides / ((datum.city.total - datum.city.black) / 10000);
      const whitePoliceHomicideRate = whitePoliceHomicides / (datum.city.white / 10000);
      const nonWhitePoliceHomicideRate =
          (totalPoliceHomicides - whitePoliceHomicides) / ((datum.city.total - datum.city.white) / 10000);
      return {
        label: datum.city.police_department,
        total: totalPoliceHomicideRate,
        data: [{
          rate: blackPoliceHomicideRate,
          type: 'black'
        }, {
          rate: nonBlackRate,
          type: 'nonblack'
        }]
      };
    }).sort((a, b) => b.total - a.total);
  }

  _renderPoliceDepartments(departments) {
    const y = this._getYAxis();
    const x = this._getXAxis();
    const rateHeight = y.rangeBand() / 2 - 1;
    let rates = departments.selectAll('rect').data((d) => d.data);

    rates.enter()
      .append('rect')
      .attr('class', (d) => `rate ${d.type}`)
      .attr('height', rateHeight)
      .attr('transform', (d) => `translate(0, ${d.type === 'black' ? rateHeight + 2 : 0})`);
    rates
      .attr('width', (d) => x(d.rate))
      .attr('x', 0)
      .style('fill', (d) => this.color(d.type));
    rates.exit().remove();
  }


  _getRowHeight() {
    return 30;
  }

  _getLegendText() {
    return 'The number of people, out of 10,000, that have been killed by the police in each city. Comparing the rate of black victims to nonblack victims. Population estimates are taken from the 2010 census.';
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

}
