import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { RegularChartsService } from '../../regular-charts.service';

@Component({
  selector: 'g[rc-mlg-chart-base]',
  templateUrl: './mlg-chart-base.component.html',
  styleUrls: ['./mlg-chart-base.component.scss']
})
export class MlgChartBaseComponent implements OnInit, OnChanges {

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

  computeLegionXs() {
    this.x1 = this.width + 2 * this.xPadding + this.regularChartsService.legionWidth / 4 * .2;
    this.x2 = this.width + 2 * this.xPadding + this.regularChartsService.legionWidth / 4 * .8;
  }

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

  computeLegionPath(i: number) {
    let path = 'M ';
    const y = this.yPadding + 40 + 30 * i;
    path = path + this.x1 + ' ' + y + ' ' + this.x2 + ' ' + y;
    return path;
  }

  constructor(public regularChartsService: RegularChartsService) { }

  ngOnInit() {
    this.computeGrid();
    this.gridID = 'grid' + this.regularChartsService.componentID;
    this.computeLegionXs();
  }

  ngOnChanges() {
    this.computeGrid();
    this.computeLegionXs();
  }

}
