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

  fontSizeXAxisTickLabel: number;
  fontSizeYAxisTickLabel: number;
  fontSizeXAxisTitle: number;
  fontSizeYAxisTitle: number;
  fontSizeLegend: number;

  positions = {
    xTick: 0,
    yTick: 0,
    xTitle: {x: 0, y: 0},
    yTitle: {x: 0, y: 0}
  };

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

  computeTickAndTitlePositions() {
    this.positions.xTick = this.clusteredBarChartService.rectHeight
     + this.clusteredBarChartService.yPadding + this.clusteredBarChartService.rectHeight * 0.1 + 5;
    this.positions.yTick = this.clusteredBarChartService.xPadding
     - this.clusteredBarChartService.rectWidth * 0.05 - 5;
    this.positions.xTitle = {
      x: this.clusteredBarChartService.rectWidth / 2 + this.clusteredBarChartService.xPadding,
      y: this.clusteredBarChartService.rectHeight
       + this.clusteredBarChartService.yPadding + this.clusteredBarChartService.rectHeight * 0.2 + 5
    };
    this.positions.yTitle = {
      x: -this.clusteredBarChartService.rectHeight / 2 - this.clusteredBarChartService.yPadding,
      y: this.clusteredBarChartService.xPadding - this.clusteredBarChartService.rectWidth * 0.08 - 5
    };
  }

  computeFontSizes() {
    this.fontSizeXAxisTickLabel = this.clusteredBarChartService.rectWidth * .02 + 5;
    this.fontSizeYAxisTickLabel = this.clusteredBarChartService.rectWidth * .02 + 5;
    this.fontSizeXAxisTitle = this.clusteredBarChartService.rectWidth * .03 + 5;
    this.fontSizeYAxisTitle = this.clusteredBarChartService.rectWidth * .03 + 5;
    this.fontSizeLegend = this.clusteredBarChartService.rectWidth * .02 + 10;
  }



  constructor(public clusteredBarChartService: ClusteredBarChartService) { }

  ngOnInit() {
    this.computeGrid();
    this.clusteredBarChartService.rectWidthBS.subscribe(w => {
      this.computeGrid();
      this.computeFontSizes();
      this.computeTickAndTitlePositions();
    });
  }

  ngOnChanges() {
    this.computeGrid();
    this.computeFontSizes();
    this.computeTickAndTitlePositions();
  }

}
