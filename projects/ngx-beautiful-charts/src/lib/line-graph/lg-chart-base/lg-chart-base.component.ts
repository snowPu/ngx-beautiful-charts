import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LineGraphService } from '../line-graph.service';

@Component({
  selector: 'g[ngx-lg-chart-base]',
  templateUrl: './lg-chart-base.component.html',
  styleUrls: ['./lg-chart-base.component.scss']
})
export class LgChartBaseComponent implements OnInit, OnChanges {

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
    this.gridWidthX = this.lineGraphService.transformX(this.gridPrecisionX);
    this.gridWidthY = this.lineGraphService.transformY(this.gridPrecisionY);
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
    this.xAxis = [];
    this.yAxis = [];
    for (let x = this.lineGraphService.minX; x <= this.lineGraphService.maxX; x = x + this.gridPrecisionX) {
      const xPos = this.lineGraphService.transformX(x) + this.lineGraphService.xPadding;
      this.xAxis.push({xPos, value: x});
    }

    for (let y = this.lineGraphService.minY; y <= this.lineGraphService.maxY; y = y + this.gridPrecisionY) {
      const yPos = this.lineGraphService.transformY(y) + this.lineGraphService.yPadding + 7;
      this.yAxis.push({yPos, value: this.lineGraphService.maxY - y });
    }
  }

  constructor(public lineGraphService: LineGraphService) { }

  ngOnInit() {
    this.computeGrid();
    this.gridID = 'grid' + this.lineGraphService.componentID;
  }

  ngOnChanges() {
    this.computeGrid();
  }

}
