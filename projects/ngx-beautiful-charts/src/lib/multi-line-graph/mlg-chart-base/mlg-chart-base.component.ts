import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MultiLineGraphService } from '../multi-line-graph.service';

@Component({
  selector: 'g[ngx-mlg-chart-base]',
  templateUrl: './mlg-chart-base.component.html',
  styleUrls: ['./mlg-chart-base.component.scss']
})
export class MlgChartBaseComponent implements OnInit, OnChanges {

  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() gridPrecisionX: number;
  @Input() gridPrecisionY: number;
  @Input() data;


  gridWidthX: number;
  gridWidthY: number;
  gridID: string;
  gridPath: string;
  x1: number;
  x2: number;
  xAxis: any;
  yAxis: any;

  computeLegionXs() {
    this.x1 = this.multiLineGraphService.rectWidth
    + 2 * this.multiLineGraphService.xPadding
    + this.multiLineGraphService.legionWidth / 4 * .2;
    this.x2 = this.multiLineGraphService.rectWidth
    + 2 * this.multiLineGraphService.xPadding
    + this.multiLineGraphService.legionWidth / 4 * .8;
  }

  computeGrid() {
    // maxX - minX --> gridPrecisionX
    // width --> gridWidthX
    this.gridWidthX = this.multiLineGraphService.transformX(this.gridPrecisionX);
    this.gridWidthY = this.multiLineGraphService.transformY(this.gridPrecisionY);
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
    this.xAxis = [];
    this.yAxis = [];
    for (let x = this.multiLineGraphService.minX; x <= this.multiLineGraphService.maxX; x = x + this.gridPrecisionX) {
      const xPos = this.multiLineGraphService.transformX(x) + this.multiLineGraphService.xPadding;
      this.xAxis.push({xPos, value: x});
    }

    for (let y = this.multiLineGraphService.minY; y <= this.multiLineGraphService.maxY; y = y + this.gridPrecisionY) {
      const yPos = this.multiLineGraphService.transformY(y) + this.multiLineGraphService.yPadding + 7;
      this.yAxis.push({yPos, value: this.multiLineGraphService.maxY - y });
    }
  }

  computeLegionPath(i: number) {
    let path = 'M ';
    const y = this.multiLineGraphService.yPadding + 35 + 30 * i;
    path = path + this.x1 + ' ' + y + ' ' + this.x2 + ' ' + y;
    return path;
  }

  constructor(public multiLineGraphService: MultiLineGraphService) { }

  ngOnInit() {
    this.computeGrid();
    this.gridID = 'grid' + this.multiLineGraphService.componentID;
    this.computeLegionXs();
  }

  ngOnChanges() {
    this.computeGrid();
    this.computeLegionXs();
  }

}
