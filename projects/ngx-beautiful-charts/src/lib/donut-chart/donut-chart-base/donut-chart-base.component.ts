import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DonutChartService } from '../donut-chart.service';

@Component({
  selector: 'g[ngx-donut-chart-base]',
  templateUrl: './donut-chart-base.component.html',
  styleUrls: ['./donut-chart-base.component.scss']
})
export class DonutChartBaseComponent implements OnInit, OnChanges {

  x1: number;
  x2: number;
  fontSizeLegend: number;

  computeLegionXs() {
    this.x1 = this.donutChartService.rectWidth + 2 * this.donutChartService.xPadding
               + this.donutChartService.legionWidth / 4 * .2;
    this.x2 = this.donutChartService.rectHeight + 2 * this.donutChartService.xPadding
               + this.donutChartService.legionWidth / 4 * .8;
  }

  computeFontSizes() {
    this.fontSizeLegend = this.donutChartService.rectWidth * .02 + 10;
  }

  computeLegionPath(i: number) {
    let path = 'M ';
    const y = this.donutChartService.yPadding + 25 + 30 * i;
    path = path + this.x1 + ' ' + y + ' ' + this.x2 + ' ' + y;
    return path;
  }

  constructor(public donutChartService: DonutChartService) { }

  ngOnInit() {
    this.donutChartService.rectWidthBS.subscribe(w => {
      this.computeLegionXs();
      this.computeFontSizes();
    });
  }

  ngOnChanges() {
    this.computeLegionXs();
    this.computeFontSizes();
  }

}
