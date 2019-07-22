import { Injectable } from '@angular/core';
import { BeautifulChartsModule } from '../beautiful-charts.module';
import { coloSchemes } from '../../constants/color-schemes';

// @Injectable({
//   providedIn: BeautifulChartsModule
// })
export class PieChartService {

  width: number;
  height: number;
  // minY: number;
  // maxY: number;
  xPadding: number;
  yPadding: number;
  componentID: number;
  data: [{name: string, color: string, value: number }];

  pieRadius: number;
  rectWidth: number;
  rectHeight: number;
  legionWidth: number;
  legionHeight: number;

  constructor() { }

  computeRectDimensions() {
    this.rectWidth = this.width * .6 - this.xPadding * 2;
    this.rectHeight = this.rectWidth;
  }

  computeLegionDimensions() {
    const noOfLines = this.data.length;
    this.legionWidth = this.width * .4 - this.xPadding * 2;
    this.legionHeight = 60 + 30 * noOfLines - 19;
  }

  setValues({
    componentID: componentID,
    width: width,
    height: height,
    xPadding: xPadding,
    yPadding: yPadding,
    data: data
  }) {
    this.componentID = componentID;
    this.width = width;
    this.height = height;
    this.xPadding = xPadding;
    this.yPadding = yPadding;
    this.data = data;
    // console.log('service color scheme: ' + this.colorScheme)

    this.pieRadius = (this.width * .6 - this.xPadding * 2) / 2;

    this.computeRectDimensions();
    this.computeLegionDimensions();
    this.printAll();
  }

  printAll() {
    console.log('line-graph-service');
    console.log('component ID: ' + this.componentID);
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('xPadding: ' + this.xPadding);
    console.log('yPadding: ' + this.yPadding);
    console.log('rectWidth: ' + this.rectWidth);
    console.log('rectHeight: ' + this.rectHeight);
  }
}
