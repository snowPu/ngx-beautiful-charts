import { Injectable } from '@angular/core';
import { BeautifulChartsModule } from '../beautiful-charts.module';
import { coloSchemes } from '../../constants/color-schemes';

// @Injectable({
//   providedIn: BeautifulChartsModule
// })
export class LineGraphService {

  width = 0;
  height = 0;
  minX = 0;
  minY = 0;
  maxX = 0;
  maxY = 0;
  xPadding = 0;
  yPadding = 0;
  componentID = 0;

  rectWidth = 0;
  rectHeight = 0;

  constructor() { }

  computeRectDimensions() {
    this.rectHeight = this.height - this.yPadding * 4;
    this.rectWidth = this.width - this.xPadding * 2;
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
    yPadding: yPadding
    }: {componentID: number, width: number,
    height: number, minX: number,
    minY: number, maxX: number,
    maxY: number, xPadding: number,
    yPadding: number}) {
    this.componentID = componentID;
    this.width = width;
    this.height = height;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.xPadding = xPadding;
    this.yPadding = yPadding;
    // console.log('service color scheme: ' + this.colorScheme)
    this.computeRectDimensions();
    this.printAll();
  }

  printAll() {
    console.log('line-graph-service');
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
  }
}
