import { Injectable } from '@angular/core';
import { BeautifulChartsModule } from '../beautiful-charts.module';
import { colorSchemes } from '../../constants/color-schemes';

// @Injectable({
//   providedIn: BeautifulChartsModule
// })
export class ClusteredBarChartService {

  width: number;
  height: number;
  minY: number;
  maxY: number;
  xPadding: number;
  yPadding: number;
  componentID: number;
  data: [{series: string, color: string, data: [{name: string, value: number }]}];

  rectWidth: number;
  rectHeight: number;
  legionWidth: number;
  legionHeight: number;
  diff: number;

  constructor() { }

  computeRectDimensions() {
    this.rectHeight = this.height - this.yPadding * 4;
    this.rectWidth = this.width * .7 - this.xPadding * 2;
  }

  computeLegionDimensions() {
    const noOfLines = this.data.length;
    this.legionWidth = this.width * .3 - this.xPadding * 2;
    this.legionHeight = 60 + 30 * noOfLines - 19;
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

    this.computeRectDimensions();
    this.computeLegionDimensions();
    // this.printAll();
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
