import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { RegularChartsService } from '../regular-charts.service';

@Component({
  selector: 'g[rc-donut-chart]',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit, OnChanges {

  @Input() data: [{name: string, color: string, value: number }];
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  donutWidthPerc = 0.4;
  donutSlices: any;
  donutRadius: number;
  donutInnerRadius: number;
  hoverDonutRadius: number;
  hoverDonutInnerRadius: number;
  cX: number;
  cY: number;
  gTranslate: string;
  hoverTranslate: string;
  hoverShift: number;

  constructor(public regularChartsService: RegularChartsService) {
  }

  generateDonutSlices() {
    this.donutSlices = [];

    let sum = 0;
    for (const val of this.data) {
      sum = sum + val.value;
    }
    let rotation = 0;

    for (const val of this.data) {

      // console.log(val);
      const perc = val.value / sum;
      const angle = 360 * perc;
      const angleMod = (angle > 180 ) ? 360 - angle : angle;
      const angleRad = angleMod * Math.PI / 180;
      const path = 'M 0 ' + -this.donutInnerRadius + ' 0 ' + -this.donutRadius
      + ' A ' + this.donutRadius + ' ' + this.donutRadius
      + ' 0 0 1 ' + this.donutRadius * Math.sin(angleRad) + ' '
      + -this.donutRadius * Math.cos(angleRad)
      + ' L ' + this.donutInnerRadius * Math.sin(angleRad) + ' '
      + -this.donutInnerRadius * Math.cos(angleRad) + ' A '
      + this.donutInnerRadius + ' ' + this.donutInnerRadius
      + ' 0 0 0 0 ' + -this.donutInnerRadius + ' z';

      const hoverPath = 'M 0 ' + -this.hoverDonutInnerRadius + ' 0 ' + -this.hoverDonutRadius
      + ' A ' + this.hoverDonutRadius + ' ' + this.hoverDonutRadius
      + ' 0 0 1 ' + this.hoverDonutRadius * Math.sin(angleRad) + ' '
      + -this.hoverDonutRadius * Math.cos(angleRad)
      + ' L ' + this.hoverDonutInnerRadius * Math.sin(angleRad) + ' '
      + -this.hoverDonutInnerRadius * Math.cos(angleRad) + ' A '
      + this.hoverDonutInnerRadius + ' ' + this.hoverDonutInnerRadius
      + ' 0 0 0 0 ' + -this.hoverDonutInnerRadius + ' z';


      const donutSlice = {
        perc: perc,
        name: val.name,
        color: val.color,
        hoverD: hoverPath,
        rotation: 'rotate(' + rotation + 'deg)',
        d: path,
        hover: false
      };

      console.log(hoverPath);
      console.log(donutSlice);
      this.donutSlices.push(donutSlice);
      rotation += angle;
    }
  }

  ngOnInit() {
    this.generateDonutSlices();
    console.log('x: ' + this.x);
    this.donutRadius = this.regularChartsService.donutRadius;
    this.donutInnerRadius = (1 - this.donutWidthPerc) * this.regularChartsService.donutRadius;
    this.hoverDonutRadius = this.regularChartsService.donutRadius * 1.05;
    this.hoverDonutInnerRadius = this.donutInnerRadius;
    console.log(this.hoverDonutRadius);
    this.cX = this.x + this.donutRadius;
    this.cY = this.y + this.donutRadius;
    const translateX = this.x + this.donutRadius;
    const translateY = this.y + this.donutRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.donutRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

  ngOnChanges() {
    this.generateDonutSlices();
    console.log('x: ' + this.x);
    this.donutRadius = this.regularChartsService.donutRadius;
    this.donutInnerRadius = (1 - this.donutWidthPerc) * this.regularChartsService.donutRadius;
    this.hoverDonutRadius = this.regularChartsService.donutRadius * 1.05;
    this.hoverDonutInnerRadius = this.donutInnerRadius;
    console.log(this.hoverDonutRadius);
    this.cX = this.x + this.donutRadius;
    this.cY = this.y + this.donutRadius;
    const translateX = this.x + this.donutRadius;
    const translateY = this.y + this.donutRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.donutRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

}
