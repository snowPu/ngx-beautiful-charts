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


  padding = 40;
  rectWidth: number;
  rectHeight: number;
  gridWidthX: number; 
  gridWidthY: number;
  gridPath: string;
  xAxis = [];
  yAxis = [];


  printAllInput() {
    console.log("width: " + this.width);
    console.log("height: " + this.height);
    console.log("minX: " + this.minX);
    console.log("minY: " + this.minY);
    console.log("maxX: " + this.maxX);
    console.log("maxY: " + this.maxY);
    console.log("gridPrecisionX: " + this.gridPrecisionX);
    console.log("gridPrecisionY: " + this.gridPrecisionY);
  }

  computeRectDimensions() {
    this.rectWidth = this.width - this.padding * 2;
    this.rectHeight = this.height - this.padding * 2;
  }

  computeGrid() {
    // maxX - minX --> gridPrecisionX
    // width --> gridWidthX
    
    this.gridWidthX = this.rectWidth * this.gridPrecisionX / (this.maxX - this.minX);
    this.gridWidthY = this.rectHeight * this.gridPrecisionY / (this.maxY - this.minY);
    this.gridPath = "M " + this.gridWidthX + " 0 L 0 0 0 " + this.gridWidthY;

    for (let x=this.minX; x<=this.maxX; x=x+this.gridPrecisionX) {
      let xPos = this.rectWidth * x / (this.maxX - this.minX);
      this.xAxis.push({xPos: xPos, value: x});
    }

    for (let y=this.minY; y<=this.maxY; y=y+this.gridPrecisionY) {
      let yPos = this.rectHeight * y / (this.maxY - this.minY);
      this.yAxis.push({yPos: yPos, value: y});
    }
    
  }

  constructor() { 
    
  }

  ngOnInit() {
    this.printAllInput();
    this.computeRectDimensions();
    this.computeGrid();
  }

  ngOnChanges() {
    this.printAllInput();
    this.computeRectDimensions();
    this.computeGrid();
  }

}
