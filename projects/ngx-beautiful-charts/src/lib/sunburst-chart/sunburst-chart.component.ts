import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BeautifulChartsService } from '../beautiful-charts.service';
import { coloSchemes } from '../../constants/color-schemes';

@Component({
  selector: 'g[ngx-sunburst-chart]',
  templateUrl: './sunburst-chart.component.html',
  styleUrls: ['./sunburst-chart.component.scss']
})
export class SunburstChartComponent implements OnInit , OnChanges {

  @Input() data: any;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  dataRefined: any;
  sunSlices: any;
  sunSliceWidth: number;
  levelSunSlices: any;
  sunRadius: number;
  sunDepth = 0;
  hoverPieRadius: number;
  cX: number;
  cY: number;
  gTranslate: string;
  hoverTranslate: string;

  constructor(public BeautifulChartsService: BeautifulChartsService) {
  }

  getRefinedData(data, i, color = null) {
    for (let sbData of data) {
      sbData.level = i;
      if (color) sbData.color = color;
      if (sbData.level > this.sunDepth) this.sunDepth = sbData.level;
      if (sbData.children) {
        if (sbData.children.length > 0) {
          sbData.children = this.getRefinedData(sbData.children, i + 1, sbData.color);
          sbData.value = sbData.children.map(child => child.value).reduce((sum, curr) => sum + curr);
        } else {
          if (!sbData.value) sbData.value = 0;
        }
      } else if (!sbData.value) sbData.value = 0;
    }
    return data;
  }

  generateSlice(data, sum, angleRange, rotation) {
    const perc = data.value / sum;
    const angle = angleRange * perc;
    const angleMod = (angle > 180 ) ? 360 - angle : angle;
    const angleRad = angleMod * Math.PI / 180;
    const textRotation = (270 + angle / 2) % 360;
    const textX = (data.level - 1) * this.sunSliceWidth + this.sunSliceWidth / 2;
    let textRotationString;
    if (textRotation > 180) {
      textRotationString = 'translate(' + textX + ', 0) scale(-1,-1) '
    } else {

    }
    let path;
    let hoverPath;
    if (data.level === 1) {
      path = 'M 0 0 0 ' + -this.sunSliceWidth + ' A '
      + this.sunSliceWidth + ' ' + this.sunSliceWidth
      + ' 0 0 1' + this.sunSliceWidth * Math.sin(angleRad) + ' '
      + -this.sunSliceWidth * Math.cos(angleRad) + ' z';

      const hoverRadius = this.sunSliceWidth * 1.1;
      hoverPath = 'M 0 0 0 ' + -hoverRadius + ' A '
      + hoverRadius + ' ' + hoverRadius
      + ' 0 0 1' + hoverRadius * Math.sin(angleRad) + ' '
      + -hoverRadius * Math.cos(angleRad) + ' z';
    } else if (data.level > 1) {
      const sunSliceInnerRadius = this.sunRadius / (this.sunDepth) * (data.level - 1);
      const sunSliceOuterRadiues = this.sunRadius / (this.sunDepth) * data.level;

      path = 'M 0 ' + -sunSliceInnerRadius + ' 0 ' + -sunSliceOuterRadiues
      + ' A ' + sunSliceOuterRadiues + ' ' + sunSliceOuterRadiues
      + ' 0 0 1 ' + sunSliceOuterRadiues * Math.sin(angleRad) + ' '
      + -sunSliceOuterRadiues * Math.cos(angleRad)
      + ' L ' + sunSliceInnerRadius * Math.sin(angleRad) + ' '
      + -sunSliceInnerRadius * Math.cos(angleRad) + ' A '
      + sunSliceInnerRadius + ' ' + sunSliceInnerRadius
      + ' 0 0 0 0 ' + -sunSliceInnerRadius + ' z';

      const hoverSliceOuterRadius = sunSliceOuterRadiues + this.sunSliceWidth * 0.1;

      hoverPath = 'M 0 ' + -sunSliceInnerRadius + ' 0 ' + -hoverSliceOuterRadius
      + ' A ' + hoverSliceOuterRadius + ' ' + hoverSliceOuterRadius
      + ' 0 0 1 ' + hoverSliceOuterRadius * Math.sin(angleRad) + ' '
      + -hoverSliceOuterRadius * Math.cos(angleRad)
      + ' L ' + sunSliceInnerRadius * Math.sin(angleRad) + ' '
      + -sunSliceInnerRadius * Math.cos(angleRad) + ' A '
      + sunSliceInnerRadius + ' ' + sunSliceInnerRadius
      + ' 0 0 0 0 ' + -sunSliceInnerRadius + ' z';
    }
    // console.log(hoverPath);

    const sunSlice = {
      perc: perc,
      name: data.name,
      color: data.color,
      hoverD: hoverPath,
      rotation: 'rotate(' + rotation + 'deg)',
      textRotation: 'rotate(' + textRotation + ')',
      textX: textX,
      d: path,
      angle: angle,
      hover: false,
      children: null
    };

    this.levelSunSlices[data.level - 1].push(sunSlice);

    return sunSlice;
  }

  generateSunSlicesForAngle(data, angleRange, rotation) {
    let sunSlices = [];

    let sum = 0;
    for (const val of data) {
      sum = sum + val.value;
    }

    for (const val of data) {

      const sunSlice = this.generateSlice(val, sum, angleRange, rotation);
      if (val.children && val.children.length > 0) {
        sunSlice.children = this.generateSunSlicesForAngle(val.children, sunSlice.angle, rotation);
      }
      // console.log(val);

      // console.log(sunSlice);
      sunSlices.push(sunSlice);
      rotation += sunSlice.angle;
    }
    return sunSlices;
  }

  generateSunSlices(data) {
    return this.generateSunSlicesForAngle(data, 360, 0);
  }

  initiateLevelSunSlices() {
    this.levelSunSlices = [];
    for (let level = 1; level <= this.sunDepth; level++) {
      this.levelSunSlices.push([]);
    }
  }

  setColors() {
    let cnt = 0;
    for (let slice of this.data) {
      if (!slice.color) slice.color = coloSchemes[this.BeautifulChartsService.colorScheme][cnt % 10];
      cnt++;
    }
  }

  ngOnInit() {
    console.log('service (oninitsun) color scheme: ' + this.BeautifulChartsService.colorScheme);
    this.setColors();
    this.dataRefined = this.getRefinedData(this.data, 1);
    // console.log('data refined: ');
    // console.log(this.dataRefined);
    this.initiateLevelSunSlices();
    // console.log(this.sunDepth);
    // console.log('level sun slices: ');
    // console.log(this.levelSunSlices);
    this.sunRadius = this.BeautifulChartsService.sunRadius;
    this.hoverPieRadius = this.BeautifulChartsService.sunRadius / this.sunDepth * 1.05;

    this.sunSliceWidth = this.sunRadius / this.sunDepth;
    this.sunSlices = this.generateSunSlices(this.dataRefined);
    // console.log(this.hoverPieRadius);
    this.cX = this.x + this.sunRadius;
    this.cY = this.y + this.sunRadius;
    const translateX = this.x + this.sunRadius;
    const translateY = this.y + this.sunRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.sunRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

  ngOnChanges() {
    console.log('service (onchangessun) color scheme: ' + this.BeautifulChartsService.colorScheme);
    this.setColors();
    this.dataRefined = this.getRefinedData(this.data, 1);
    // console.log('data refined: ');
    // console.log(this.dataRefined);
    this.initiateLevelSunSlices();
    // console.log(this.sunDepth);
    // console.log('level sun slices: ');
    // console.log(this.levelSunSlices);
    this.sunRadius = this.BeautifulChartsService.sunRadius;
    this.hoverPieRadius = this.BeautifulChartsService.sunRadius / this.sunDepth * 1.05;

    this.sunSliceWidth = this.sunRadius / this.sunDepth;
    this.sunSlices = this.generateSunSlices(this.dataRefined);
    // console.log(this.hoverPieRadius);
    this.cX = this.x + this.sunRadius;
    this.cY = this.y + this.sunRadius;
    const translateX = this.x + this.sunRadius;
    const translateY = this.y + this.sunRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.sunRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

}
