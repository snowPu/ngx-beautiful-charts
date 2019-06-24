import { Injectable } from '@angular/core';
import { RegularChartsModule } from './regular-charts.module';

// @Injectable({
//   providedIn: RegularChartsModule
// })
export class RegularChartsService {

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
  data;

  // bar chart
  diff: number;

  constructor() { }

  computeRectDimensions() {
    if (this.chartType === 'line-graph') {
      this.rectWidth = this.width - this.xPadding * 2;
    } else if (this.chartType === 'multi-line-graph') {
      this.rectWidth = this.width * .6 - this.xPadding * 2;
    } else if (this.chartType === 'bar-chart') {
      this.rectWidth = this.width - this.xPadding * 2;
    }
    this.rectHeight = this.height - this.yPadding * 4;

    console.log(this.chartType + ' - rectWidth: ' + this.rectWidth + ', rectHeight: ' + this.rectHeight);
  }

  computeLegionDimensions() {
    if (this.chartType === 'multi-line-graph') {
      const noOfLines = this.data.length;
      this.legionWidth = this.width * .4 - this.xPadding * 2;
      this.legionHeight = 60 + 30 * noOfLines - 19;
    }
  }

  transformX(x: number) {
    return this.rectWidth * x / (this.maxX - this.minX);
  }

  transformY(y: number) {
    return this.rectHeight * y / (this.maxY - this.minY);
  }

  closestMultipleLessThanEqualTo(factor, num) {
    if (num % factor === 0) return num;
    else return this.closestMultipleLessThanEqualTo(factor, --num);
  }

  closestMultipleMoreThanEqualTo(factor, num) {
    if (num % factor === 0) return num;
    else return this.closestMultipleLessThanEqualTo(factor, ++num);
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
    data: data
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

    }

    this.computeRectDimensions();
    this.computeLegionDimensions();
  }
}
