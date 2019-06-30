import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RegularChartsService } from '../regular-charts.service';
import { coloSchemes } from '../../constants/color-schemes';

@Component({
  selector: 'g[ngx-pie-chart]',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() data: [{name: string, color: string, value: number }];
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  pieSlices: any;
  pieRadius: number;
  hoverPieRadius: number;
  cX: number;
  cY: number;
  gTranslate: string;
  hoverTranslate: string;

  constructor(public regularChartsService: RegularChartsService) {
  }

  generatePieSlices() {
    this.pieSlices = [];

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
      const path = 'M 0 0 0 ' + -this.pieRadius + ' A '
      + this.pieRadius + ' ' + this.pieRadius
      + ' 0 0 1' + this.pieRadius * Math.sin(angleRad) + ' '
      + -this.pieRadius * Math.cos(angleRad) + ' z';

      const hoverPath = 'M 0 0 0 ' + -this.hoverPieRadius + ' A '
      + this.hoverPieRadius + ' ' + this.hoverPieRadius
      + ' 0 0 1' + this.hoverPieRadius * Math.sin(angleRad) + ' '
      + -this.hoverPieRadius * Math.cos(angleRad) + ' z';


      const pieSlice = {
        perc: perc,
        name: val.name,
        color: val.color,
        hoverD: hoverPath,
        rotation: 'rotate(' + rotation + 'deg)',
        d: path,
        hover: false
      };

      // console.log(hoverPath);
      // console.log(pieSlice);
      this.pieSlices.push(pieSlice);
      rotation += angle;
    }
  }

  setColors() {
    let cnt = 0;
    for (let slice of this.data) {
      if (!slice.color) slice.color = coloSchemes[this.regularChartsService.colorScheme][cnt % 10];
      cnt++;
    }
  }

  ngOnInit() {
    this.setColors();
    this.generatePieSlices();
    // console.log('x: ' + this.x);
    this.pieRadius = this.regularChartsService.pieRadius;
    this.hoverPieRadius = this.regularChartsService.pieRadius * 1.05;
    // console.log(this.hoverPieRadius);
    this.cX = this.x + this.pieRadius;
    this.cY = this.y + this.pieRadius;
    const translateX = this.x + this.pieRadius;
    const translateY = this.y + this.pieRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.pieRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

  ngOnChanges() {
    this.setColors();
    this.generatePieSlices();
    // console.log('x: ' + this.x);
    this.pieRadius = this.regularChartsService.pieRadius;
    this.hoverPieRadius = this.regularChartsService.pieRadius * 1.05;
    // console.log(this.hoverPieRadius);
    this.cX = this.x + this.pieRadius;
    this.cY = this.y + this.pieRadius;
    const translateX = this.x + this.pieRadius;
    const translateY = this.y + this.pieRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.pieRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

}
