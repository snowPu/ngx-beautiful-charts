import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
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

  fontSizeXAxisTickLabel: number;
  fontSizeYAxisTickLabel: number;
  fontSizeXAxisTitle: number;
  fontSizeYAxisTitle: number;

  positions = {
    xTick: 0,
    yTick: 0,
    xTitle: {x: 0, y: 0},
    yTitle: {x: 0, y: 0}
  };

  computeTickAndTitlePositions() {
    this.positions.xTick = this.lineGraphService.rectHeight
     + this.lineGraphService.yPadding + this.lineGraphService.rectHeight * 0.05 + 5;
    this.positions.yTick = this.lineGraphService.xPadding
     - this.lineGraphService.rectWidth * 0.03 - 5;
    this.positions.xTitle = {
      x: this.lineGraphService.rectWidth / 2 + this.lineGraphService.xPadding,
      y: this.lineGraphService.rectHeight + this.lineGraphService.yPadding + this.lineGraphService.rectHeight * 0.15 + 5
    };
    this.positions.yTitle = {
      x: -this.lineGraphService.rectHeight / 2 - this.lineGraphService.yPadding,
      y: this.lineGraphService.xPadding - this.lineGraphService.rectWidth * 0.06 - 5
    };
  }

  computeFontSizes() {
    this.fontSizeXAxisTickLabel = this.lineGraphService.rectWidth * .015 + 5;
    this.fontSizeYAxisTickLabel = this.lineGraphService.rectWidth * .015 + 5;
    this.fontSizeXAxisTitle = this.lineGraphService.rectWidth * .025 + 5;
    this.fontSizeYAxisTitle = this.lineGraphService.rectWidth * .025 + 5;
  }

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

  constructor(public lineGraphService: LineGraphService, protected cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.computeGrid();
    this.gridID = 'grid' + this.lineGraphService.componentID;
    this.lineGraphService.rectWidthBS.subscribe(w => {
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
