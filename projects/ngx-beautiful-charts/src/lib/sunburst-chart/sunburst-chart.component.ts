import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';
import { colorSchemes } from '../../constants/color-schemes';
import { SunburstChartService } from './sunburst-chart.service';
import { GlobalParametersService } from '../../global/global-parameters.service';

@Component({
  selector: 'ngx-sunburst-chart',
  templateUrl: './sunburst-chart.component.html',
  styleUrls: ['./sunburst-chart.component.scss'],
  providers: [SunburstChartService]
})
export class SunburstChartComponent implements OnInit , OnChanges {

  @Input() data: any;
  @Input() width: number;
  @Input() colorScheme = 'colorful';
  @Input() customColorScheme: string[] = [];

  componentID;
  height: number;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  dataRefined: any;
  sunSlices: any;
  sunSliceWidth: number;
  levelSunSlices: any;
  sunRadius: number;
  sunDepth = 0;
  // hoverPieRadius: number;
  cX: number;
  cY: number;
  gTranslate: string;
  hoverTranslate: string;

  constructor(public sunburstChartService: SunburstChartService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) {
  }

  getRefinedData(data, i, color = null) {
    for (const sbData of data) {
      sbData.level = i;
      if (color && !sbData.color) sbData.color = color;
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

  setDimensions() {
    if (this.width) this.height = this.width - this.xPadding;
    else {
      const host = this.currentElement.nativeElement;
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.width = dims.width;
        this.height = this.width - this.xPadding;
      }
    }
    // console.log('---set dimensions---');
    // console.log('width: ' + this.width);
    // console.log('height: ' + this.height);
    // console.log('--------------------');
  }

  generateSlice(data, sum, angleRange, rotation) {
    const perc = data.value / sum;
    const angle = angleRange * perc;
    // const angleMod = (angle > 180 ) ? 360 - angle : angle;
    const angleRad = angle * Math.PI / 180;
    const largeArc = (angle > 180) ? 1 : 0;
    const textRotation = (270 + angle / 2) % 360;
    const textX = (data.level - 1) * this.sunSliceWidth + this.sunSliceWidth / 2;
    let textRotationString = 'rotate(' + textRotation + 'deg)';
    if (rotation > 180) {
      const x = textX * 2;
      textRotationString = textRotationString + ' scale(-1,-1) translateX(' + -x + 'px)';
    }
    let path;
    let hoverPath;
    if (data.level === 1) {
      path = 'M 0 0 0 ' + -this.sunSliceWidth + ' A '
      + this.sunSliceWidth + ' ' + this.sunSliceWidth
      + ' 0 ' + largeArc + ' 1 ' + this.sunSliceWidth * Math.sin(angleRad) + ' '
      + -this.sunSliceWidth * Math.cos(angleRad) + ' z';

      const hoverRadius = this.sunSliceWidth * 1.1;
      hoverPath = 'M 0 0 0 ' + -hoverRadius + ' A '
      + hoverRadius + ' ' + hoverRadius
      + ' 0 ' + largeArc + ' 1 ' + hoverRadius * Math.sin(angleRad) + ' '
      + -hoverRadius * Math.cos(angleRad) + ' z';
    } else if (data.level > 1) {
      const sunSliceInnerRadius = this.sunRadius / (this.sunDepth) * (data.level - 1);
      const sunSliceOuterRadius = this.sunRadius / (this.sunDepth) * data.level;

      path = 'M 0 ' + -sunSliceInnerRadius + ' 0 ' + -sunSliceOuterRadius
      + ' A ' + sunSliceOuterRadius + ' ' + sunSliceOuterRadius
      + ' 0 ' + largeArc + ' 1 ' + sunSliceOuterRadius * Math.sin(angleRad) + ' '
      + -sunSliceOuterRadius * Math.cos(angleRad)
      + ' L ' + sunSliceInnerRadius * Math.sin(angleRad) + ' '
      + -sunSliceInnerRadius * Math.cos(angleRad) + ' A '
      + sunSliceInnerRadius + ' ' + sunSliceInnerRadius
      + ' 0 ' + largeArc + ' 0 0 ' + -sunSliceInnerRadius + ' z';

      const hoverSliceOuterRadius = sunSliceOuterRadius + this.sunSliceWidth * 0.1;

      hoverPath = 'M 0 ' + -sunSliceInnerRadius + ' 0 ' + -hoverSliceOuterRadius
      + ' A ' + hoverSliceOuterRadius + ' ' + hoverSliceOuterRadius
      + ' 0 ' + largeArc + ' 1 ' + hoverSliceOuterRadius * Math.sin(angleRad) + ' '
      + -hoverSliceOuterRadius * Math.cos(angleRad)
      + ' L ' + sunSliceInnerRadius * Math.sin(angleRad) + ' '
      + -sunSliceInnerRadius * Math.cos(angleRad) + ' A '
      + sunSliceInnerRadius + ' ' + sunSliceInnerRadius
      + ' 0 ' + largeArc + ' 0 0 ' + -sunSliceInnerRadius + ' z';
    }
    // console.log(hoverPath);

    const sunSlice = {
      perc,
      name: data.name,
      color: data.color,
      hoverD: hoverPath,
      rotation: 'rotate(' + rotation + 'deg)',
      textRotation: textRotationString,
      textX,
      d: path,
      angle,
      hover: false,
      children: null
    };

    this.levelSunSlices[data.level - 1].push(sunSlice);

    return sunSlice;
  }

  generateSunSlicesForAngle(data, angleRange, rotation) {
    const sunSlices = [];

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
    for (const slice of this.data) {
      if (!slice.color) {
        if (this.customColorScheme.length > 0) {
          slice.color = this.customColorScheme[cnt % this.customColorScheme.length];
        } else {
          slice.color = colorSchemes[this.colorScheme][cnt % 10];
        }
        cnt++;
      }
    }
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    // console.log('service (oninitsun) color scheme: ' + this.sunburstChartService.colorScheme);
    this.setColors();
    this.setDimensions();
    this.sunburstChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.sunRadius = this.sunburstChartService.sunRadius;
    this.dataRefined = this.getRefinedData(this.data, 1);
    // console.log('data refined: ');
    // console.log(this.dataRefined);
    this.initiateLevelSunSlices();
    // console.log(this.sunDepth);
    // console.log('level sun slices: ');
    // console.log(this.levelSunSlices);
    // this.hoverPieRadius = this.sunburstChartService.sunRadius / this.sunDepth * 1.05;

    this.sunSliceWidth = this.sunRadius / this.sunDepth;
    this.sunSlices = this.generateSunSlices(this.dataRefined);
    // console.log(this.hoverPieRadius);
    this.cX = this.xPadding + this.sunRadius;
    this.cY = this.yPadding + this.sunRadius;
    const translateX = this.xPadding + this.sunRadius;
    const translateY = this.yPadding + this.sunRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.sunRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

  ngOnChanges() {
    // console.log('service (onchangessun) color scheme: ' + this.sunburstChartService.colorScheme);
    this.setColors();
    this.setDimensions();
    this.sunburstChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.sunRadius = this.sunburstChartService.sunRadius;
    this.dataRefined = this.getRefinedData(this.data, 1);
    // console.log('data refined: ');
    // console.log(this.dataRefined);
    this.initiateLevelSunSlices();
    // console.log(this.sunDepth);
    // console.log('level sun slices: ');
    // console.log(this.levelSunSlices);
    // this.hoverPieRadius = this.sunburstChartService.sunRadius / this.sunDepth * 1.05;

    this.sunSliceWidth = this.sunRadius / this.sunDepth;
    this.sunSlices = this.generateSunSlices(this.dataRefined);
    // console.log(this.hoverPieRadius);
    this.cX = this.xPadding + this.sunRadius;
    this.cY = this.yPadding + this.sunRadius;
    const translateX = this.xPadding + this.sunRadius;
    const translateY = this.yPadding + this.sunRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.sunRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

}
