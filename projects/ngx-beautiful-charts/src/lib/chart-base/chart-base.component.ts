import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BeautifulChartsService } from '../beautiful-charts.service';

@Component({
  selector: 'g[ngx-chart-base]',
  templateUrl: './chart-base.component.html',
  styleUrls: ['./chart-base.component.scss']
})
export class ChartBaseComponent implements OnInit, OnChanges {

  @Input() width: number;
  @Input() height: number;
  @Input() xPadding: number;
  @Input() yPadding: number;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() gridPrecisionX: string;
  @Input() gridPrecisionY: string;
  @Input() showGridLines: boolean;


  gridID: string;
  gridPath: string;
  x1: number;
  x2: number;

  // computeLegionXs() {
  //   this.x1 = this.width + 2 * this.xPadding + this.beautifulChartsService.legionWidth / 4 * .2;
  //   this.x2 = this.width + 2 * this.xPadding + this.beautifulChartsService.legionWidth / 4 * .8;
  // }

  // computeGrid() {
  //   this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
  // }

  // computeLegionPath(i: number) {
  //   let path = 'M ';
  //   const y = this.yPadding + 40 + 30 * i;
  //   path = path + this.x1 + ' ' + y + ' ' + this.x2 + ' ' + y;
  //   return path;
  // }

  constructor(public beautifulChartsService: BeautifulChartsService) { }

  ngOnInit() {
    // this.computeGrid();
    this.gridID = 'grid' + this.beautifulChartsService.componentID;
    // this.computeLegionXs();
  }

  ngOnChanges() {
    // this.computeGrid();
    // this.computeLegionXs();
  }

}
