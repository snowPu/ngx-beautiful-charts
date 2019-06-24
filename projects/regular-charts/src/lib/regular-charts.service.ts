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

  constructor() { }

  computeRectDimensions() {
    if (this.chartType === 'line-graph') {
      this.rectWidth = this.width - this.xPadding * 2;
    } else if (this.chartType === 'multi-line-graph') {
      this.rectWidth = this.width * .6 - this.xPadding * 2;
    }
    this.rectHeight = this.height - this.yPadding * 4;

    console.log(this.chartType + ' - rectWidth: ' + this.rectWidth + ', rectHeight: ' + this.rectHeight);
  }

  computeLegionDimensions() {
    if (this.chartType === 'multi-line-graph') {
      const noOfLines = this.data.length;
      this.legionWidth = this.width * .4 - this.xPadding * 2;
      this.legionHeight = 60 + 20 * noOfLines;
    }
  }

  transformX(x: number) {
    return this.rectWidth * x / (this.maxX - this.minX);
  }

  transformY(y: number) {
    return this.rectHeight * y / (this.maxY - this.minY);
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

    this.computeRectDimensions();
    this.computeLegionDimensions();
  }
}
