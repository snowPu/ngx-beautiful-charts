import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BeautifulChartsService } from '../beautiful-charts.service';
import { coloSchemes } from '../../constants/color-schemes';

@Component({
  selector: 'g[ngx-bar-chart]',
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
    const noOfXAxisValues = this.BeautifulChartsService.data.length;
    const eachWidth = this.width / noOfXAxisValues;
    const barWidth = eachWidth * .25;
    let cnt = -1;
    let barPath = '';
    for (const bcD of this.BeautifulChartsService.data) {
      cnt ++;
      const xPos = cnt * eachWidth + eachWidth / 2 + this.x;
      const yPos = this.BeautifulChartsService.transformY(this.BeautifulChartsService.maxY - bcD.value) + this.y;

      const xStart = xPos - barWidth / 2;
      const xEnd = xPos + barWidth / 2;
      const yStart = this.height + this.y;
      barPath = 'M ';
      barPath = barPath + ' ' + xStart + ' ' + yStart + ' L ' + xStart
      + ' ' + yPos + ' ' + xEnd + ' ' + yPos + ' ' + xEnd + ' ' + yStart + ' Z';

      this.barPaths.push(barPath);
    }

  }

  constructor(public BeautifulChartsService: BeautifulChartsService) { }

  setColor() {
    if (!this.color) this.color = coloSchemes[this.BeautifulChartsService.colorScheme][0];
  }

  ngOnInit() {
    this.setColor();
    console.log(this.color);
    this.computeBarPaths();
  }

  ngOnChanges() {
    this.setColor();
    console.log(this.color);
    this.computeBarPaths();
  }

}
