import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PieChartService } from '../pie-chart.service';

@Component({
  selector: 'g[ngx-pie-chart-base]',
  templateUrl: './pie-chart-base.component.html',
  styleUrls: ['./pie-chart-base.component.scss']
})
export class PieChartBaseComponent implements OnInit, OnChanges {

  x1: number;
  x2: number;
  fontSizeLegend: number;

  computeLegionXs() {
    this.x1 = this.pieChartService.rectWidth + 2 * this.pieChartService.xPadding + this.pieChartService.legionWidth / 4 * .2;
    this.x2 = this.pieChartService.rectHeight + 2 * this.pieChartService.xPadding + this.pieChartService.legionWidth / 4 * .8;
  }

  computeLegionPath(i: number) {
    let path = 'M ';
    const y = this.pieChartService.yPadding + 25 + 30 * i;
    path = path + this.x1 + ' ' + y + ' ' + this.x2 + ' ' + y;
    return path;
  }

  computeFontSizes() {
    this.fontSizeLegend = this.pieChartService.rectWidth * .02 + 10;
  }

  constructor(public pieChartService: PieChartService) { }

  ngOnInit() {
    this.pieChartService.rectWidthBS.subscribe(w => {
      this.computeLegionXs();
      this.computeFontSizes();
    });
  }

  ngOnChanges() {
    this.computeLegionXs();
    this.computeFontSizes();
  }

}
