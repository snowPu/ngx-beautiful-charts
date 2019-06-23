import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
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


  constructor() { }

  computeRectDimensions() {
    this.rectWidth = this.width - this.xPadding * 2;
    this.rectHeight = this.height - this.yPadding * 4;
  }

  transformX(x: number) {
    return this.rectWidth * x / (this.maxX - this.minX);
  }

  transformY(y: number) {
    return this.rectHeight * y / (this.maxY - this.minY);
  }

  setValues({
    width: width,
    height: height,
    minX: minX,
    minY: minY,
    maxX: maxX,
    maxY: maxY,
    xPadding: xPadding,
    yPadding: yPadding
  }) {
    this.width = width;
    this.height = height;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.xPadding = xPadding;
    this.yPadding = yPadding;

    this.computeRectDimensions();
  }
}
