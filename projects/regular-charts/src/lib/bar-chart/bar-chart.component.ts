import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RegularChartsService } from '../regular-charts.service';

@Component({
  selector: 'g[rc-bar-chart]',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() data: [{name: string, value: number }];
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @Input() color: string;

  barPaths: string[];

  computeBarPaths() {
    this.barPaths = [];
    const noOfXAxisValues = this.regularChartsService.data.length;
    const eachWidth = this.width / noOfXAxisValues;
    const barWidth = eachWidth * .25;
    let cnt = -1;
    let barPath = '';
    for (const bcD of this.regularChartsService.data) {
      cnt ++;
      const xPos = cnt * eachWidth + eachWidth / 2 + this.x;
      const yPos = this.regularChartsService.transformY(this.regularChartsService.maxY - bcD.value) + this.y;

      const xStart = xPos - barWidth / 2;
      const xEnd = xPos + barWidth / 2;
      const yStart = this.height + this.y;
      barPath = 'M ';
      barPath = barPath + ' ' + xStart + ' ' + yStart + ' L ' + xStart
      + ' ' + yPos + ' ' + xEnd + ' ' + yPos + ' ' + xEnd + ' ' + yStart + ' Z';

      this.barPaths.push(barPath);
    }

  }

  constructor(public regularChartsService: RegularChartsService) { }

  ngOnInit() {
    this.computeBarPaths();
  }

  ngOnChanges() {
    this.computeBarPaths();
  }

}
