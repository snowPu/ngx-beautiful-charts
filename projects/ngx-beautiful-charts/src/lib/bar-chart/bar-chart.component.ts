import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { coloSchemes } from '../../constants/color-schemes';
import { BarChartService } from './bar-chart.service';
import { GlobalParametersService } from '../../global/global-parameters.service';

@Component({
  selector: 'ngx-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  providers: [BarChartService]
})
export class BarChartComponent implements OnInit, OnChanges {

  // <h4>Bar Chart</h4>
  // <ngx-beautiful-charts [width]="1100" [height]="400"
  // [displayXAxis]="true"
  // [displayYAxis]="true"
  // xAxisTitle="City"
  // yAxisTitle="Value"
  // [data]="barChartData"
  // chartType="bar-chart" [showGridLines]="true"></ngx-beautiful-charts>

  @Input() data: [{name: string, value: number }];
  @Input() width: number;
  @Input() height: number;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() showGridLines = false;
  @Input() color: string;
  @Input() colorScheme = 'colorful';

  componentID: number;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  barPaths: string[];
  dataCopy;

  computeBarPaths() {
    this.barPaths = [];
    const noOfXAxisValues = this.data.length;
    const eachWidth = this.barChartService.rectWidth / noOfXAxisValues;
    const barWidth = eachWidth * .25;
    let cnt = -1;
    let barPath = '';
    for (const bcD of this.data) {
      cnt ++;
      const xPos = cnt * eachWidth + eachWidth / 2 + this.xPadding;
      const yPos = this.barChartService.transformY(this.barChartService.maxY - bcD.value) + this.yPadding;

      const xStart = xPos - barWidth / 2;
      const xEnd = xPos + barWidth / 2;
      const yStart = this.barChartService.rectHeight + this.yPadding;
      barPath = 'M ';
      barPath = barPath + ' ' + xStart + ' ' + yStart + ' L ' + xStart
      + ' ' + yPos + ' ' + xEnd + ' ' + yPos + ' ' + xEnd + ' ' + yStart + ' Z';

      this.barPaths.push(barPath);
    }

  }

  constructor(public barChartService: BarChartService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) { }

  setColor() {
    if (!this.color) this.color = coloSchemes[this.colorScheme][0];
  }

  setDimensions() {
    if (this.width && !this.height) this.height = this.width / 3;
    else if (!this.width && this.height) this.width = this.height * 3;
    else if (!this.width && !this.height) {
      const host = this.currentElement.nativeElement;
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.width = dims.width;
        this.height = dims.width / 3;
      }
    }
    console.log('---set dimensions---');
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('--------------------');
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    console.log('init..');
    this.setDimensions();
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.barChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.setColor();
    console.log(this.color);
    this.computeBarPaths();
  }

  ngOnChanges() {
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.barChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.setColor();
    console.log(this.color);
    this.computeBarPaths();
  }

}
