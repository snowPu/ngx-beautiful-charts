import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BeautifulChartsService } from '../../beautiful-charts.service';

@Component({
  selector: 'g[ngx-bc-chart-base]',
  templateUrl: './bc-chart-base.component.html',
  styleUrls: ['./bc-chart-base.component.scss']
})
export class BcChartBaseComponent implements OnInit, OnChanges {

  @Input() width: number;
  @Input() height: number;
  @Input() xPadding: number;
  @Input() yPadding: number;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() showGridLines: boolean;

  yLevelPaths: string[];
  xAxis;
  yAxis;

  computeGrid() {
    // // get range of values in y axis
    // let minVal = null;
    // let maxVal = null;
    // let range = 0;
    // minVal = Math.min(...this.beautifulChartsService.data.map(oneData => oneData.value));
    // maxVal = Math.max(...this.beautifulChartsService.data.map(oneData => oneData.value));

    // range = maxVal - minVal;
    // console.log('range: ' + range);

    // const limInc = 10;
    // let lim = 10;
    // this.diff = 1;
    // while (range > lim) {
    //   this.diff++;
    //   lim += limInc;
    // }

    // this.startY = this.closestMultipleLessThanEqualTo(this.diff, minVal);
    // this.startY = this.startY - this.diff * 2;
    // this.endY = this.closestMultipleMoreThanEqualTo(this.diff, maxVal);
    // this.endY = this.endY + this.diff * 2;

    this.yLevelPaths = [];
    this.xAxis = [];
    this.yAxis = [];

    for (let y = this.beautifulChartsService.minY; y <= this.beautifulChartsService.maxY; y = y + this.beautifulChartsService.diff) {
      const rectEnd = this.xPadding + this.width;
      const yTransformed = this.beautifulChartsService.transformY(this.beautifulChartsService.maxY - y) + this.yPadding;
      const path = 'M ' + this.xPadding + ' ' + yTransformed + ' L ' + rectEnd + ' ' + yTransformed;
      this.yLevelPaths.push(path);
      this.yAxis.push({yPos: yTransformed, value: y });
    }

    // console.log('diff: ' + this.beautifulChartsService.diff);
    // console.log(this.yAxis);

    // now the x axis :)

    let noOfXAxisValues;
    if (this.beautifulChartsService.chartType === 'bar-chart') {
      noOfXAxisValues = this.beautifulChartsService.data.length;
      const eachWidth = this.width / noOfXAxisValues;
      let cnt = -1;
      for (const bcD of this.beautifulChartsService.data) {
        cnt ++;
        const xPos = cnt * eachWidth + eachWidth / 2 + this.xPadding;
        this.xAxis.push({xPos: xPos, value: bcD.name});
      }
    } else if (this.beautifulChartsService.chartType === 'clustered-bar-chart') {
      let uniqueXAxisValues;
      uniqueXAxisValues = new Set();
      for (const series of this.beautifulChartsService.data) {
        const seriesData = series.data;
        for (const sData of seriesData) {
          uniqueXAxisValues.add(sData.name);
        }
      }
      noOfXAxisValues = uniqueXAxisValues.size;
      const eachWidth = this.width / noOfXAxisValues;
      let cnt = -1;
      for (const xAxisValue of uniqueXAxisValues) {
        cnt ++;
        const xPos = cnt * eachWidth + eachWidth / 2 + this.xPadding;
        this.xAxis.push({xPos: xPos, value: xAxisValue });
      }
    }

    // this.gridWidthX = this.beautifulChartsService.transformX(this.gridPrecisionX);
    // this.gridWidthY = this.beautifulChartsService.transformY(this.gridPrecisionY);
    // this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
    // this.xAxis = [];
    // this.yAxis = [];
    // for (let x = this.beautifulChartsService.minX; x <= this.beautifulChartsService.maxX; x = x + this.gridPrecisionX) {
    //   const xPos = this.beautifulChartsService.transformX(x) + this.xPadding;
    //   this.xAxis.push({xPos: xPos, value: x});
    // }

    // for (let y = this.beautifulChartsService.minY; y <= this.beautifulChartsService.maxY; y = y + this.gridPrecisionY) {
    //   const yPos = this.beautifulChartsService.transformY(y) + this.yPadding + 7;
    //   this.yAxis.push({yPos: yPos, value: this.beautifulChartsService.maxY - y });
    // }
  }

  constructor(public beautifulChartsService: BeautifulChartsService) { }

  ngOnInit() {
    this.computeGrid();
  }

  ngOnChanges() {
    this.computeGrid();
  }

}
