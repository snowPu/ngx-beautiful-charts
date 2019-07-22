import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { coloSchemes } from '../../constants/color-schemes';
import { PieChartService } from './pie-chart.service';
import { GlobalParametersService } from '../../global/global-parameters.service';

@Component({
  selector: 'ngx-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  providers: [PieChartService]
})
export class PieChartComponent implements OnInit, OnChanges {

  // <ngx-beautiful-charts [width]="800"
  // [data]="pieChartData"
  // chartType="pie-chart"></ngx-beautiful-charts>

  @Input() data: [{name: string, color: string, value: number }];
  @Input() width: number;
  @Input() colorScheme: string;

  componentID;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  height: number;
  pieSlices: any;
  pieRadius: number;
  hoverPieRadius: number;
  cX: number;
  cY: number;
  gTranslate: string;
  hoverTranslate: string;
  pieSlicesInit = 0;

  constructor(public pieChartService: PieChartService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) {
  }

  generatePieSlices(pieCompletion) {
    if (this.pieSlicesInit === 0) this.pieSlices = [];

    let sum = 0;
    for (const val of this.data) {
      sum = sum + val.value;
    }
    let rotation = 0;
    let rotationRad = 0;

    let cnt = 0;

    for (const val of this.data) {
      // console.log(val);
      const perc = val.value / sum * pieCompletion;
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

      const pieInteriorX = this.pieRadius * 2 / 3 * Math.sin(rotationRad + angleRad / 2);
      const pieInteriorY = -this.pieRadius * 2 / 3 * Math.cos(rotationRad + angleRad / 2);
      const toolTipText = (Math.round(perc * 10000) / 100).toString() + '%';

      const pieSlice = {
        perc,
        name: val.name,
        color: val.color,
        hoverD: hoverPath,
        rotation: 'rotate(' + rotation + 'deg)',
        d: path,
        hover: false,
        toolTipTranslate: 'translate(' + pieInteriorX + 'px, ' + pieInteriorY + 'px)',
        toolTipText
      };

      // console.log(hoverPath);
      // console.log(pieSlice);
      if ( this.pieSlicesInit === 0 ) this.pieSlices.push(pieSlice);
      else this.pieSlices[cnt] = pieSlice;
      // this.pieSlices.push(pieSlice);
      rotation += angle;
      rotationRad = rotation * Math.PI / 180;

      cnt ++;
    }
  }

  setDimensions() {
    if (this.width) this.height = this.width * .6 - this.xPadding;
    else {
      const host = this.currentElement.nativeElement;
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.width = dims.width;
        this.height = this.width * .6 - this.xPadding;
      }
    }
    console.log('---set dimensions---');
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('--------------------');
  }

  setColors() {
    let cnt = 0;
    for (let slice of this.data) {
      if (!slice.color) slice.color = coloSchemes[this.colorScheme][cnt % 10];
      cnt++;
    }
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    // console.log('x: ' + this.x);
    this.setColors();
    this.setDimensions();
    this.data.sort((a, b) => a.value > b.value ? -1 : a.value < b.value ? 1 : 0);
    this.pieSlicesInit = 0;
    this.pieChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.pieRadius = this.pieChartService.pieRadius;
    this.hoverPieRadius = this.pieChartService.pieRadius * 1.05;
    let pieCompletion = 0;

    const intervalID = setInterval(() => {
      this.generatePieSlices(pieCompletion);
      this.pieSlicesInit = 1;
      pieCompletion = pieCompletion + 0.01;
      pieCompletion = Math.round(pieCompletion * 100) / 100;
      console.log(pieCompletion);
      if (pieCompletion > 1) clearInterval(intervalID);
    }, 5);
    // console.log(this.hoverPieRadius);
    this.cX = this.xPadding + this.pieRadius;
    this.cY = this.yPadding + this.pieRadius;
    const translateX = this.xPadding + this.pieRadius;
    const translateY = this.yPadding + this.pieRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.pieRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

  ngOnChanges() {
    // console.log('x: ' + this.x);
    this.setColors();
    this.setDimensions();
    this.data.sort((a, b) => a.value > b.value ? -1 : a.value < b.value ? 1 : 0);
    this.pieSlicesInit = 0;
    this.pieChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.pieRadius = this.pieChartService.pieRadius;
    this.hoverPieRadius = this.pieChartService.pieRadius * 1.05;
    let pieCompletion = 0;
    const intervalID = setInterval(() => {
      this.generatePieSlices(pieCompletion);
      this.pieSlicesInit = 1;
      pieCompletion = pieCompletion + 0.01;
      pieCompletion = Math.round(pieCompletion * 100) / 100;
      if (pieCompletion > 1) clearInterval(intervalID);
    }, 5);
    // console.log(this.hoverPieRadius);
    this.cX = this.xPadding + this.pieRadius;
    this.cY = this.yPadding + this.pieRadius;
    const translateX = this.xPadding + this.pieRadius;
    const translateY = this.yPadding + this.pieRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.pieRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

}
