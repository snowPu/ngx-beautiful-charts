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

  computeTickAndTitlePositions() {
    this.positions.xTick = this.multiLineGraphService.rectHeight
     + this.multiLineGraphService.yPadding + this.multiLineGraphService.rectHeight * 0.1 + 5;
    this.positions.yTick = this.multiLineGraphService.xPadding
     - this.multiLineGraphService.rectWidth * 0.05 - 5;
    this.positions.xTitle = {
      x: this.multiLineGraphService.rectWidth / 2 + this.multiLineGraphService.xPadding,
      y: this.multiLineGraphService.rectHeight + this.multiLineGraphService.yPadding + this.multiLineGraphService.rectHeight * 0.2 + 5
    };
    this.positions.yTitle = {
      x: -this.multiLineGraphService.rectHeight / 2 - this.multiLineGraphService.yPadding,
      y: this.multiLineGraphService.xPadding - this.multiLineGraphService.rectWidth * 0.08 - 5
    };
  }

  computeFontSizes() {
    this.fontSizeXAxisTickLabel = this.multiLineGraphService.rectWidth * .02 + 5;
    this.fontSizeYAxisTickLabel = this.multiLineGraphService.rectWidth * .02 + 5;
    this.fontSizeXAxisTitle = this.multiLineGraphService.rectWidth * .03 + 5;
    this.fontSizeYAxisTitle = this.multiLineGraphService.rectWidth * .03 + 5;
    this.fontSizeLegend = this.multiLineGraphService.rectWidth * .02 + 10;
  }

  computeLegionXs() {
    this.x1 = this.multiLineGraphService.rectWidth
    + 2 * this.multiLineGraphService.xPadding
    + this.multiLineGraphService.legionWidth / 16;
    this.x2 = this.multiLineGraphService.rectWidth
    + 2 * this.multiLineGraphService.xPadding
    + this.multiLineGraphService.legionWidth * 3 / 16;
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
    this.multiLineGraphService.rectWidthBS.subscribe(w => {
      this.computeGrid();
      this.computeLegionXs();
      this.computeFontSizes();
      this.computeTickAndTitlePositions();
    });

  }

  ngOnChanges() {
    this.computeGrid();
    this.computeLegionXs();
    this.computeFontSizes();
    this.computeTickAndTitlePositions();
  }

}
