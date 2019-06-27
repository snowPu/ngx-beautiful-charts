import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RegularChartsService } from './regular-charts.service';
import { GlobalParametersService } from '../global/global-parameters.service';

@Component({
  selector: 'rc-regular-charts',
  templateUrl: './regular-charts.component.html',
  styles: [],
  providers: [RegularChartsService]
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
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() data;
  @Input() color;
  @Input() chartType: string;
  @Input() showGridLines: boolean;

  xPadding = 60;
  yPadding = this.xPadding / 2;

  rectWidth: number;
  rectHeight: number;
  // gridWidthX: number;
  // gridWidthY: number;
  // gridPath: string;
  xAxis = [];
  yAxis = [];
  componentID: number;

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


  constructor(public regularChartsService: RegularChartsService, private globalParametersService: GlobalParametersService) {
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    if (this.chartType === 'pie-chart' || this.chartType === 'donut-chart') {
      this.height = this.width * .6 + this.yPadding * 4;
    }
    this.regularChartsService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      chartType: this.chartType,
      data: this.data
    });
    this.printAllInput();
    // if (this.chartType === 'line-graph' || this.chartType === 'multi-line-graph') {
    //   this.computeGrid();
    // }
    // this.transformData();
  }

  ngOnChanges() {
    if (this.chartType === 'pie-chart' || this.chartType === 'donut-chart') {
      this.height = this.width * .6 + this.yPadding * 4;
    }
    this.regularChartsService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      chartType: this.chartType,
      data: this.data
    });
    this.printAllInput();
    // if (this.chartType === 'line-graph' || this.chartType === 'multi-line-graph') {
    //   this.computeGrid();
    // }
    // this.transformData();
  }

}
