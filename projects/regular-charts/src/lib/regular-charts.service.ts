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
  padding: number;
  rectWidth: number;
  rectHeight: number;


  constructor() { }

  computeRectDimensions() {
    this.rectWidth = this.width - this.padding * 2;
    this.rectHeight = this.height - this.padding * 2;
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
    padding: padding
  }) {
    this.width = width;
    this.height = height;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    this.padding = padding;

    this.computeRectDimensions();
  }
}
