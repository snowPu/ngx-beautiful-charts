import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';
import { coloSchemes } from '../../constants/color-schemes';
import { ClusteredBarChartService } from './clustered-bar-chart.service';
import { GlobalParametersService } from '../../global/global-parameters.service';

@Component({
  selector: 'ngx-clustered-bar-chart',
  templateUrl: './clustered-bar-chart.component.html',
  styleUrls: ['./clustered-bar-chart.component.scss'],
  providers: [ClusteredBarChartService]
})
export class ClusteredBarChartComponent implements OnInit, OnChanges {

  @Input() data: [{series: string, color: string, data: [{name: string, value: number }]}];
  @Input() width: number;
  @Input() height: number;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() showGridLines = false;
  @Input() colorScheme = 'colorful';

  componentID: number;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  barPaths: any;
  dataCopy;
  // [{color: string, paths: string[]}];

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

  computeBarPaths() {
    this.barPaths = [];
    let uniqueXAxisValues;
    let noOfXAxisValues;
    uniqueXAxisValues = new Set();
    for (const series of this.data) {
      const seriesData = series.data;
      for (const sData of seriesData) {
        uniqueXAxisValues.add(sData.name);
      }
    }
    noOfXAxisValues = uniqueXAxisValues.size;
    const noOfSeries = this.data.length;
    const eachWidth = this.clusteredBarChartService.rectWidth / noOfXAxisValues;
    const categoryWidth = eachWidth * .5;
    const barWidth = categoryWidth / noOfSeries;
    let cnt = -1;
    let barPath = '';
    let cntSeries = -1;
    for (const bcS of this.data) {
      cntSeries++;
      cnt = -1;
      let seriesPaths;
      seriesPaths = [];
      for (const bcD of bcS.data) {
        cnt ++;
        const xPos = cnt * eachWidth + .25 * eachWidth + cntSeries * barWidth + .5 * barWidth + this.xPadding;
        const yPos = this.clusteredBarChartService.transformY(this.clusteredBarChartService.maxY - bcD.value) + this.yPadding;
        const xStart = xPos - barWidth / 2;
        const xEnd = xPos + barWidth / 2;
        const yStart = this.clusteredBarChartService.rectHeight + this.yPadding;
        barPath = 'M ';
        barPath = barPath + ' ' + xStart + ' ' + yStart + ' L ' + xStart
        + ' ' + yPos + ' ' + xEnd + ' ' + yPos + ' ' + xEnd + ' ' + yStart + ' Z';
        seriesPaths.push(barPath);
      }
      this.barPaths.push({color: bcS.color, paths: seriesPaths});
    }
  }

  constructor(public clusteredBarChartService: ClusteredBarChartService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) { }

  setColors() {
    let cnt = 0;
    for (const seriesData of this.data) {
      if (!seriesData.color) seriesData.color = coloSchemes[this.colorScheme][cnt % 10];
      cnt++;
    }
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    console.log('init..');
    this.setDimensions();
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.setColors();
    this.clusteredBarChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.computeBarPaths();
  }

  ngOnChanges() {
    this.setColors();
    this.clusteredBarChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.computeBarPaths();
  }

}
