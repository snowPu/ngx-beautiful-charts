import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'rc-regular-charts',
  templateUrl: './regular-charts.component.html',
  styles: []
})
export class RegularChartsComponent implements OnInit, OnChanges {

  @Input() width: number;
  @Input() height: number;
  @Input() minX: number;
  @Input() minY: number;
  @Input() maxX: number;
  @Input() maxY: number;
  @Input() gridPrecisionX: number;
  @Input() gridPrecisionY: number;
  @Input() displayXAxis: boolean;
  @Input() displayYAxis: boolean;
  @Input() data: [{x: number, y: number, info: any }];


  padding = 60;
  rectWidth: number;
  rectHeight: number;
  gridWidthX: number;
  gridWidthY: number;
  gridPath: string;
  xAxis = [];
  yAxis = [];
  transformedData = [];


  printAllInput() {
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('minX: ' + this.minX);
    console.log('minY: ' + this.minY);
    console.log('maxX: ' + this.maxX);
    console.log('maxY: ' + this.maxY);
    console.log('gridPrecisionX: ' + this.gridPrecisionX);
    console.log('gridPrecisionY: ' + this.gridPrecisionY);
  }

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

  transformData() {
    this.transformedData = [];
    for (const point of this.data) {
      this.transformedData.push({
        x: this.transformX(point.x) + this.padding,
        y: this.transformY(this.maxY - point.y) + this.padding,
        info: point.info,
        originalX: point.x,
        originalY: point.y
      });
    }
  }

  computeGrid() {
    // maxX - minX --> gridPrecisionX
    // width --> gridWidthX
    this.gridWidthX = this.transformX(this.gridPrecisionX);
    this.gridWidthY = this.transformY(this.gridPrecisionY);
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
    this.xAxis = [];
    this.yAxis = [];
    for (let x = this.minX; x <= this.maxX; x = x + this.gridPrecisionX) {
      const xPos = this.transformX(x) + this.padding;
      this.xAxis.push({xPos: xPos, value: x});
    }

    for (let y = this.minY; y <= this.maxY; y = y + this.gridPrecisionY) {
      const yPos = this.transformY(y) + this.padding + 7;
      this.yAxis.push({yPos: yPos, value: this.maxY - y });
    }
  }

  constructor() {
  }

  ngOnInit() {
    this.printAllInput();
    this.computeRectDimensions();
    this.computeGrid();
    this.transformData();
  }

  ngOnChanges() {
    this.printAllInput();
    this.computeRectDimensions();
    this.computeGrid();
    this.transformData();
  }

}
