import { Injectable } from '@angular/core';
import { BeautifulChartsModule } from '../beautiful-charts.module';
import { coloSchemes } from '../../constants/color-schemes';

// @Injectable({
//   providedIn: BeautifulChartsModule
// })
export class BarChartService {

  width: number;
  height: number;
  minY: number;
  maxY: number;
  xPadding: number;
  yPadding: number;
  componentID: number;
  data: [{name: string, value: number }];

  rectWidth: number;
  rectHeight: number;
  diff: number;

  constructor() { }

  computeRectDimensions() {
    this.rectHeight = this.height - this.yPadding * 4;
    this.rectWidth = this.width - this.xPadding * 2;
  }

  transformY(y: number) {
    return this.rectHeight * y / (this.maxY - this.minY);
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

    this.computeRectDimensions();
    this.printAll();
  }

  printAll() {
    console.log('line-graph-service');
    console.log('component ID: ' + this.componentID);
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('minY: ' + this.minY);
    console.log('maxY: ' + this.maxY);
    console.log('xPadding: ' + this.xPadding);
    console.log('yPadding: ' + this.yPadding);
    console.log('rectWidth: ' + this.rectWidth);
    console.log('rectHeight: ' + this.rectHeight);
  }
}
