import { Injectable } from '@angular/core';
import { BeautifulChartsModule } from '../beautiful-charts.module';
import { coloSchemes } from '../../constants/color-schemes';

// @Injectable({
//   providedIn: BeautifulChartsModule
// })
export class MultiLineGraphService {

  width: number;
  height: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  xPadding: number;
  yPadding: number;
  dataLength: number;
  componentID: number;

  rectWidth: number;
  rectHeight: number;
  legionWidth: number;
  legionHeight: number;

  constructor() { }

  computeRectDimensions() {
    this.rectHeight = this.height - this.yPadding * 4;
    this.rectWidth = this.width * .6 - this.xPadding * 2;
  }

  computeLegionDimensions() {
    const noOfLines = this.dataLength;
    this.legionWidth = this.width * .4 - this.xPadding * 2;
    this.legionHeight = 60 + 30 * noOfLines - 19;
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
    dataLength: dataLength,
    xPadding: xPadding,
    yPadding: yPadding
  }) {
    this.componentID = componentID;
    this.width = width;
    this.height = height;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.dataLength = dataLength;
    this.xPadding = xPadding;
    this.yPadding = yPadding;
    // console.log('service color scheme: ' + this.colorScheme)
    this.computeRectDimensions();
    this.computeLegionDimensions();
    this.printAll();
  }

  printAll() {
    console.log('multi-line-graph-service');
    console.log('component ID: ' + this.componentID);
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('minX: ' + this.minX);
    console.log('minY: ' + this.minY);
    console.log('maxX: ' + this.maxX);
    console.log('maxY: ' + this.maxY);
    console.log('xPadding: ' + this.xPadding);
    console.log('yPadding: ' + this.yPadding);
    console.log('rectWidth: ' + this.rectWidth);
    console.log('rectHeight: ' + this.rectHeight);
    console.log('legionWidth: ' + this.legionWidth);
    console.log('legionHeight: ' + this.legionHeight);
  }
}
