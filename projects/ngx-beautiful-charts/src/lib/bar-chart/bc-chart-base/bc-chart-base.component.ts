import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BarChartService } from '../bar-chart.service';

@Component({
  selector: 'g[ngx-bc-chart-base]',
  templateUrl: './bc-chart-base.component.html',
  styleUrls: ['./bc-chart-base.component.scss']
})
export class BcChartBaseComponent implements OnInit, OnChanges {

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

    for (let y = this.barChartService.minY; y <= this.barChartService.maxY; y = y + this.barChartService.diff) {
      const rectEnd = this.barChartService.xPadding + this.barChartService.rectWidth;
      const yTransformed = this.barChartService.transformY(this.barChartService.maxY - y) + this.barChartService.yPadding;
      const path = 'M ' + this.barChartService.xPadding + ' ' + yTransformed + ' L ' + rectEnd + ' ' + yTransformed;
      this.yLevelPaths.push(path);
      this.yAxis.push({yPos: yTransformed, value: y });
    }

    // console.log('diff: ' + this.barChartService.diff);
    // console.log(this.yAxis);

    // now the x axis :)

    let noOfXAxisValues;
    noOfXAxisValues = this.barChartService.data.length;
    const eachWidth = this.barChartService.rectWidth / noOfXAxisValues;
    let cnt = -1;
    for (const bcD of this.barChartService.data) {
      cnt ++;
      const xPos = cnt * eachWidth + eachWidth / 2 + this.barChartService.xPadding;
      this.xAxis.push({xPos, value: bcD.name});
    }
    // else if (this.barChartService.chartType === 'clustered-bar-chart') {
    //   let uniqueXAxisValues;
    //   uniqueXAxisValues = new Set();
    //   for (const series of this.barChartService.data) {
    //     const seriesData = series.data;
    //     for (const sData of seriesData) {
    //       uniqueXAxisValues.add(sData.name);
    //     }
    //   }
    //   noOfXAxisValues = uniqueXAxisValues.size;
    //   const eachWidth = this.width / noOfXAxisValues;
    //   let cnt = -1;
    //   for (const xAxisValue of uniqueXAxisValues) {
    //     cnt ++;
    //     const xPos = cnt * eachWidth + eachWidth / 2 + this.xPadding;
    //     this.xAxis.push({xPos: xPos, value: xAxisValue });
    //   }
    // }

  }

  constructor(public barChartService: BarChartService) { }

  ngOnInit() {
    this.computeGrid();
  }

  ngOnChanges() {
    this.computeGrid();
  }

}
