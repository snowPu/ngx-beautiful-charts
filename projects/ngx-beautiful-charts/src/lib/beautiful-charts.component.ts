import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BeautifulChartsService } from './beautiful-charts.service';
import { GlobalParametersService } from '../global/global-parameters.service';

@Component({
  selector: 'ngx-beautiful-charts',
  templateUrl: './beautiful-charts.component.html',
  styles: [],
  providers: [BeautifulChartsService]
})
export class BeautifulChartsComponent implements OnInit, OnChanges {

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
  @Input() colorScheme: string;

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
  dataCopy: any;

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


  constructor(public beautifulChartsService: BeautifulChartsService, private globalParametersService: GlobalParametersService) {
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    if (!this.width) this.width = 800;
    if (!this.height) this.height = 400;
    if (this.chartType === 'pie-chart') {
      this.height = this.width * .6 - this.xPadding;
    } else if (this.chartType === 'donut-chart') {
      this.height = this.width * .6 - this.xPadding;
    } else if (this.chartType === 'sunburst-chart') {
      this.height = this.width - this.xPadding;
    }
    this.beautifulChartsService.setValues({
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
      data: this.dataCopy,
      colorScheme: this.colorScheme
    });
    // this.printAllInput();
    // if (this.chartType === 'line-graph' || this.chartType === 'multi-line-graph') {
    //   this.computeGrid();
    // }
    // this.transformData();
  }

  ngOnChanges() {
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    if (!this.width) this.width = 800;
    if (!this.height) this.height = 400;
    if (this.chartType === 'pie-chart') {
      this.height = this.width * .6 - this.xPadding;
    } else if (this.chartType === 'donut-chart') {
      this.height = this.width * .6 - this.xPadding;
    } else if (this.chartType === 'sunburst-chart') {
      this.height = this.width - this.xPadding;
    }
    this.beautifulChartsService.setValues({
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
      data: this.dataCopy,
      colorScheme: this.colorScheme
    });
    // this.printAllInput();
    // if (this.chartType === 'line-graph' || this.chartType === 'multi-line-graph') {
    //   this.computeGrid();
    // }
    // this.transformData();
  }

}
