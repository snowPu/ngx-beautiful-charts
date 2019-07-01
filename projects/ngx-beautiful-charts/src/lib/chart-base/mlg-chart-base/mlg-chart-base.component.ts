import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BeautifulChartsService } from '../../beautiful-charts.service';

@Component({
  selector: 'g[ngx-mlg-chart-base]',
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
    this.x1 = this.width + 2 * this.xPadding + this.beautifulChartsService.legionWidth / 4 * .2;
    this.x2 = this.width + 2 * this.xPadding + this.beautifulChartsService.legionWidth / 4 * .8;
  }

  computeGrid() {
    // maxX - minX --> gridPrecisionX
    // width --> gridWidthX
    this.gridWidthX = this.beautifulChartsService.transformX(this.gridPrecisionX);
    this.gridWidthY = this.beautifulChartsService.transformY(this.gridPrecisionY);
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
    this.xAxis = [];
    this.yAxis = [];
    for (let x = this.beautifulChartsService.minX; x <= this.beautifulChartsService.maxX; x = x + this.gridPrecisionX) {
      const xPos = this.beautifulChartsService.transformX(x) + this.xPadding;
      this.xAxis.push({xPos: xPos, value: x});
    }

    for (let y = this.beautifulChartsService.minY; y <= this.beautifulChartsService.maxY; y = y + this.gridPrecisionY) {
      const yPos = this.beautifulChartsService.transformY(y) + this.yPadding + 7;
      this.yAxis.push({yPos: yPos, value: this.beautifulChartsService.maxY - y });
    }
  }

  computeLegionPath(i: number) {
    let path = 'M ';
    const y = this.yPadding + 40 + 30 * i;
    path = path + this.x1 + ' ' + y + ' ' + this.x2 + ' ' + y;
    return path;
  }

  constructor(public beautifulChartsService: BeautifulChartsService) { }

  ngOnInit() {
    this.computeGrid();
    this.gridID = 'grid' + this.beautifulChartsService.componentID;
    this.computeLegionXs();
  }

  ngOnChanges() {
    this.computeGrid();
    this.computeLegionXs();
  }

}
