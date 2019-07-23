import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ClusteredBarChartService } from '../clustered-bar-chart.service';

@Component({
  selector: 'g[ngx-cbc-chart-base]',
  templateUrl: './cbc-chart-base.component.html',
  styleUrls: ['./cbc-chart-base.component.scss']
})
export class CbcChartBaseComponent implements OnInit, OnChanges {

  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() showGridLines: boolean;

  yLevelPaths: string[];
  xAxis;
  yAxis;

  computeGrid() {
    this.yLevelPaths = [];
    this.xAxis = [];
    this.yAxis = [];

    for (let y = this.clusteredBarChartService.minY; y <= this.clusteredBarChartService.maxY; y = y + this.clusteredBarChartService.diff) {
      const rectEnd = this.clusteredBarChartService.xPadding + this.clusteredBarChartService.rectWidth;
      const yTransformed = this.clusteredBarChartService.transformY(this.clusteredBarChartService.maxY - y)
                          + this.clusteredBarChartService.yPadding;
      const path = 'M ' + this.clusteredBarChartService.xPadding + ' ' + yTransformed + ' L ' + rectEnd + ' ' + yTransformed;
      this.yLevelPaths.push(path);
      this.yAxis.push({yPos: yTransformed, value: y });
    }

    // console.log('diff: ' + this.clusteredBarChartService.diff);
    // console.log(this.yAxis);

    // now the x axis :)

    // let noOfXAxisValues;
    // noOfXAxisValues = this.clusteredBarChartService.data.length;
    // const eachWidth = this.clusteredBarChartService.rectWidth / noOfXAxisValues;
    // let cnt = -1;
    // for (const bcD of this.clusteredBarChartService.data) {
    //   cnt ++;
    //   const xPos = cnt * eachWidth + eachWidth / 2 + this.clusteredBarChartService.xPadding;
    //   this.xAxis.push({xPos, value: bcD.name});
    // }

    let noOfXAxisValues;
    let uniqueXAxisValues;
    uniqueXAxisValues = new Set();
    for (const series of this.clusteredBarChartService.data) {
      const seriesData = series.data;
      for (const sData of seriesData) {
        uniqueXAxisValues.add(sData.name);
      }
    }
    noOfXAxisValues = uniqueXAxisValues.size;
    const eachWidth = this.clusteredBarChartService.rectWidth / noOfXAxisValues;
    let cnt = -1;
    for (const xAxisValue of uniqueXAxisValues) {
      cnt ++;
      const xPos = cnt * eachWidth + eachWidth / 2 + this.clusteredBarChartService.xPadding;
      this.xAxis.push({xPos, value: xAxisValue });
    }

  }

  constructor(public clusteredBarChartService: ClusteredBarChartService) { }

  ngOnInit() {
    this.computeGrid();
  }

  ngOnChanges() {
    this.computeGrid();
  }

}
