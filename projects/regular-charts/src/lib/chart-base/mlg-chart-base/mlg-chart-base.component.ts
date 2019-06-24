import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { RegularChartsService } from '../../regular-charts.service';

@Component({
  selector: 'g[rc-mlg-chart-base]',
  templateUrl: './mlg-chart-base.component.html',
  styleUrls: ['./mlg-chart-base.component.scss']
})
export class MlgChartBaseComponent implements OnInit, OnChanges {

  @Input() gridWidthX: number;
  @Input() gridWidthY: number;
  @Input() width: number;
  @Input() height: number;
  @Input() xPadding: number;
  @Input() yPadding: number;
  @Input() xAxis;
  @Input() yAxis;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;


  gridID: string;
  gridPath: string;
  x1: number;
  x2: number;

  computeLegionXs() {
    this.x1 = this.width + 2 * this.xPadding + this.regularChartsService.legionWidth / 4 * .2;
    this.x2 = this.width + 2 * this.xPadding + this.regularChartsService.legionWidth / 4 * .8;
  }

  computeGrid() {
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
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
