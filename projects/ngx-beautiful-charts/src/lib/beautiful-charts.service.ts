import { Injectable } from '@angular/core';
import { BeautifulChartsModule } from './beautiful-charts.module';
import { coloSchemes } from '../constants/color-schemes';

// @Injectable({
//   providedIn: BeautifulChartsModule
// })
export class BeautifulChartsService {

  width: number;
  height: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  xPadding: number;
  yPadding: number;
  rectWidth: number;
  rectHeight: number;
  legionWidth: number;
  legionHeight: number;
  chartType: string;
  componentID: number;
  pieRadius: number;
  donutRadius: number;
  sunRadius: number;
  colorScheme: string;
  color: string;
  ganttTeams: Array<any>;
  ganttPhases: Array<any>;
  phaseTimelines;
  legion;
  ganttMinDate;
  ganttMaxDate;
  ganttDateRange: number;
  data;

  // bar chart
  diff: number;
  monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];

  constructor() { }

  setColors() {
    let cnt = 0;
    switch (this.chartType) {
      case 'line-graph':
        if (!this.color) this.color = coloSchemes[this.colorScheme][0];
        break;
      case '':
        break;
    }
    if (this.chartType === 'gantt-chart') {
      for (const team of this.data) {
        if (!team.color) team.color = coloSchemes[this.colorScheme][cnt % 10];
        cnt++;
      }
    }
  }

  computeRectDimensions() {
    this.rectHeight = this.height - this.yPadding * 4;
    const noOfLines = Math.ceil(this.data.length / 3);

    if (this.chartType === 'line-graph') {
      this.rectWidth = this.width - this.xPadding * 2;
    } else if (this.chartType === 'multi-line-graph') {
      this.rectWidth = this.width * .6 - this.xPadding * 2;
    } else if (this.chartType === 'bar-chart') {
      this.rectWidth = this.width - this.xPadding * 2;
    } else if (this.chartType === 'clustered-bar-chart') {
      this.rectWidth = this.width * .7 - this.xPadding * 2;
    } else if (this.chartType === 'pie-chart') {
      this.rectWidth = this.width * .6 - this.xPadding * 2;
      this.rectHeight = this.rectWidth;
    } else if (this.chartType === 'donut-chart') {
     this.rectWidth = this.width * .6 - this.xPadding * 2;
     this.rectHeight = this.rectWidth;
    } else if (this.chartType === 'sunburst-chart') {
      this.rectWidth = this.width - this.xPadding * 2;
      this.rectHeight = this.rectWidth;
    } else if (this.chartType === 'gantt-chart') {
      this.rectWidth = this.width - this.xPadding * 2 - 150;
      this.rectHeight = this.ganttPhases.length * 60;
    }


    // console.log(this.chartType + ' - rectWidth: ' + this.rectWidth + ', rectHeight: ' + this.rectHeight);
  }

  computeLegionDimensions() {
    if (this.chartType === 'multi-line-graph') {
      const noOfLines = this.data.length;
      this.legionWidth = this.width * .4 - this.xPadding * 2;
      this.legionHeight = 60 + 30 * noOfLines - 19;
    } else if (this.chartType === 'clustered-bar-chart') {
      // let uniqueXAxisValues;
      // uniqueXAxisValues = new Set();
      // for (const series of this.data) {
      //   const seriesData = series.data;
      //   for (const sData of seriesData) {
      //     uniqueXAxisValues.add(sData.name);
      //   }
      // }
      const noOfLines = this.data.length;
      this.legionWidth = this.width * .3 - this.xPadding * 2;
      this.legionHeight = 60 + 30 * noOfLines - 19;
    } else if (this.chartType === 'pie-chart') {
      const noOfLines = this.data.length;
      this.legionWidth = this.width * .4 - this.xPadding * 2;
      this.legionHeight = 60 + 30 * noOfLines - 19;
    } else if (this.chartType === 'donut-chart') {
     const noOfLines = this.data.length;
     this.legionWidth = this.width * .4 - this.xPadding * 2;
     this.legionHeight = 60 + 30 * noOfLines - 19;
    } else if (this.chartType === 'gantt-chart') {
      const noOfLines = Math.ceil(this.data.length / 3);
      this.legionWidth = this.width - this.xPadding * 2 - 150;
      this.legionHeight = 40 + 40 * noOfLines;
      let cnt = 0;
      this.legion = [];
      for (let line = 0; line < noOfLines; line++) {
        let legionLine = [];
        let i = 0;
        for (let i=0; i<3; i++) {
          if (this.ganttTeams[cnt]) legionLine.push(this.ganttTeams[cnt]);
          cnt++;
        }
        this.legion.push(legionLine);
      }
      console.log('legion: ');
      console.log(this.legion);
    }
    //  else if (this.chartType === 'sunburst-chart') {
    //   const noOfLines = this.data.length;
    //   this.legionWidth = this.width * .3 - this.xPadding * 2;
    //   this.legionHeight = 60 + 30 * noOfLines - 19;
    // }
  }

  transformX(x: number) {
    return this.rectWidth * x / (this.maxX - this.minX);
  }

  transformY(y: number) {
    return this.rectHeight * y / (this.maxY - this.minY);
  }

  transformGanttDate(d) {
    const oneDay = 24 * 60 * 60 * 1000;
    const daysSinceMinDate = Math.round(Math.abs(
        (new Date(d).getTime()
        - (new Date(this.ganttMinDate)).getTime()
        ) / (oneDay)));
    return this.rectWidth * daysSinceMinDate / (this.maxX - this.minX);
  }

  closestMultipleLessThanEqualTo(factor, num) {
    if (num % factor === 0) return num;
    else return this.closestMultipleLessThanEqualTo(factor, num - 1);
  }

  closestMultipleMoreThanEqualTo(factor, num) {
    if (num % factor === 0) return num;
    else return this.closestMultipleMoreThanEqualTo(factor, num + 1);
  }

  setValues({
    componentID: componentID,
    width: width,
    height: height,
    minX: minX,
    minY: minY,
    maxX: maxX,
    maxY: maxY,
    xPadding: xPadding,
    yPadding: yPadding,
    chartType: chartType,
    data: data,
    color: color,
    colorScheme: colorScheme
  }) {
    this.componentID = componentID;
    this.width = width;
    this.height = height;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.xPadding = xPadding;
    this.yPadding = yPadding;
    this.chartType = chartType;
    this.data = data;
    this.color = color;
    this.colorScheme = (colorScheme) ? colorScheme : 'colorful';
    // console.log('service color scheme: ' + this.colorScheme);

    if (this.chartType === 'bar-chart') {

      const minVal = Math.min(...this.data.map(oneData => oneData.value));
      const maxVal = Math.max(...this.data.map(oneData => oneData.value));
      const range = maxVal - minVal;

      const limInc = 10;
      let lim = 10;
      this.diff = 1;
      while (range > lim) {
        this.diff++;
        lim += limInc;
      }
      this.minY = this.closestMultipleLessThanEqualTo(this.diff, minVal);
      this.minY = this.minY - this.diff * 2;
      this.maxY = this.closestMultipleMoreThanEqualTo(this.diff, maxVal);
      this.maxY = this.maxY + this.diff * 2;

    } else if (this.chartType === 'clustered-bar-chart') {

      let minVals = [];
      let maxVals = [];
      minVals = [];
      maxVals = [];
      for (const bcD of this.data) {
        const min = Math.min(...bcD.data.map(oneData => oneData.value));
        const max = Math.max(...bcD.data.map(oneData => oneData.value));
        minVals.push(min);
        maxVals.push(max);
      }
      const minVal = Math.min(...minVals);
      const maxVal = Math.max(...maxVals);
      const range = maxVal - minVal;

      const limInc = 10;
      let lim = 10;
      this.diff = 1;
      while (range > lim) {
        this.diff++;
        lim += limInc;
      }
      this.minY = this.closestMultipleLessThanEqualTo(this.diff, minVal);
      this.minY = this.minY - this.diff * 2;
      this.maxY = this.closestMultipleMoreThanEqualTo(this.diff, maxVal);
      this.maxY = this.maxY + this.diff * 2;

    } else if (this.chartType === 'pie-chart') {
      this.pieRadius = (this.width * .6 - this.xPadding * 2) / 2;
    } else if (this.chartType === 'donut-chart') {
      this.donutRadius = (this.width * .6 - this.xPadding * 2) / 2;
    } else if (this.chartType === 'sunburst-chart') {
      this.sunRadius = (this.width - this.xPadding * 2) / 2;
    } else if (this.chartType === 'gantt-chart') {
      let froms = [];
      let tos = [];
      let phases = new Set();
      this.ganttTeams = [];
      this.setColors();
      console.log(this.data);
      for (const team of this.data) {
        this.ganttTeams.push({name: team.name, color: team.color});
        for (const phase of Object.keys(team.timelines)) {
          phases.add(phase);
          for (const timeline of team.timelines[phase]) {
            froms.push(timeline.from);
            tos.push(timeline.to);
          }
        }
      }
      this.ganttPhases = Array.from(phases);

      console.log('phase timelines: ');
      console.log(this.phaseTimelines);

      const minDate = froms.reduce((a, b) => new Date(a) < new Date(b) ? a : b );
      const maxDate = tos.reduce((a, b) => new Date(a) > new Date(b) ? a : b );

      this.ganttMinDate = minDate;
      this.ganttMaxDate = maxDate;
      // console.log(this.ganttMinDate + ' - ' + this.ganttMaxDate);
      const noOfLines = Math.ceil(this.data.length / 3);
      this.height = this.ganttPhases.length * 60 + this.yPadding * 3 + 100 + 40 + 30 * noOfLines;

      const oneDay = 24 * 60 * 60 * 1000;
      this.ganttDateRange = Math.round(Math.abs(
          (new Date(this.ganttMaxDate).getTime()
          - new Date(this.ganttMinDate).getTime()
          ) / (oneDay)));
      console.log('Date Range: ');
      console.log(this.ganttDateRange);
      this.minX = 0;
      // this.maxX = this.ganttDateRange;
      let flag = 0;
      let qts = 1;
      let gridPrecisionX = 0;
      while (flag === 0) {
        if (this.ganttDateRange <= 90 * qts) {
          gridPrecisionX = 7 * qts;
          flag = 1;
          break;
        } else { qts = qts + 1; }
      }
      console.log('qts: ' + qts);
      console.log('Date Range: ');
      console.log(this.ganttDateRange);
      this.maxX = this.closestMultipleMoreThanEqualTo(7 * qts, this.ganttDateRange);
      this.ganttMaxDate = this.addDays(this.ganttMinDate, this.maxX);
      console.log('ganttmindate: ' + this.ganttMinDate);
      console.log('ganttmaxdate: ' + this.ganttMaxDate);
      console.log('minX: ' + this.minX);
      console.log('maxX: ' + this.maxX);

    }


    this.computeRectDimensions();
    this.computeLegionDimensions();
  }

  addDays(date, days: number) {
    let newdate = new Date(date);
    newdate.setDate((new Date(date)).getDate() + days);
    let day = newdate.getDate();
    let monthIndex = newdate.getMonth();
    let year = newdate.getFullYear();


    return this.monthNames[monthIndex] + ' ' + day + ', ' + year;
  }
}
