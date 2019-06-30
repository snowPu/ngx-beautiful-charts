import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RegularChartsService } from '../../regular-charts.service';

@Component({
  selector: 'g[ngx-lg-chart-base]',
  templateUrl: './lg-chart-base.component.html',
  styleUrls: ['./lg-chart-base.component.scss']
})
export class LgChartBaseComponent implements OnInit, OnChanges {

  @Input() width: number;
  @Input() height: number;
  @Input() xPadding: number;
  @Input() yPadding: number;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() gridPrecisionX: number;
  @Input() gridPrecisionY: number;

  gridWidthX: number;
  gridWidthY: number;
  gridID: string;
  gridPath: string;
  x1: number;
  x2: number;
  xAxis: any;
  yAxis: any;

  computeGrid() {
    // maxX - minX --> gridPrecisionX
    // width --> gridWidthX
    this.gridWidthX = this.regularChartsService.transformX(this.gridPrecisionX);
    this.gridWidthY = this.regularChartsService.transformY(this.gridPrecisionY);
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
    this.xAxis = [];
    this.yAxis = [];
    for (let x = this.regularChartsService.minX; x <= this.regularChartsService.maxX; x = x + this.gridPrecisionX) {
      const xPos = this.regularChartsService.transformX(x) + this.xPadding;
      this.xAxis.push({xPos: xPos, value: x});
    }

    for (let y = this.regularChartsService.minY; y <= this.regularChartsService.maxY; y = y + this.gridPrecisionY) {
      const yPos = this.regularChartsService.transformY(y) + this.yPadding + 7;
      this.yAxis.push({yPos: yPos, value: this.regularChartsService.maxY - y });
    }
  }

  constructor(public regularChartsService: RegularChartsService) { }

  ngOnInit() {
    this.computeGrid();
    this.gridID = 'grid' + this.regularChartsService.componentID;
  }

  ngOnChanges() {
    this.computeGrid();
  }

}
