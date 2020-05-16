import { Component, OnInit, OnChanges, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { colorSchemes } from '../../constants/color-schemes';
import { GlobalParametersService } from '../../global/global-parameters.service';
import { DonutChartService } from './donut-chart.service';
import { fromEvent as observableFromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  providers: [DonutChartService]
})
export class DonutChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() data: [{name: string, color: string, value: number }];
  @Input() width: number;
  @Input() colorScheme: string;
  @Input() customColorScheme: string[] = [];

  componentID;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  height: number;
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
  donutSlicesInit = 0;

  setWidth = 0;
  setHeight = 0;
  resizeSubscription: Subscription;

  constructor(public donutChartService: DonutChartService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) {
  }

  generateDonutSlices(donutCompletion) {
    if (this.donutSlicesInit === 0) this.donutSlices = [];

    let sum = 0;
    for (const val of this.data) {
      sum = sum + val.value;
    }
    let rotation = 0;

    let cnt = 0;

    for (const val of this.data) {

      // console.log(val);
      const perc = val.value / sum * donutCompletion;
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
        perc,
        name: val.name,
        color: val.color,
        hoverD: hoverPath,
        rotation: 'rotate(' + rotation + 'deg)',
        d: path,
        hover: false
      };

      // console.log(hoverPath);
      // console.log(donutSlice);
      if ( this.donutSlicesInit === 0 ) this.donutSlices.push(donutSlice);
      else this.donutSlices[cnt] = donutSlice;

      // this.donutSlices.push(donutSlice);
      rotation += angle;
      cnt ++;
    }
  }

  setDimensions() {
    if (this.width) {
      this.setWidth = this.width;
      this.setHeight = this.setWidth * .6 - this.xPadding;
    } else {
      const host = this.currentElement.nativeElement;
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.setWidth = Math.max(dims.width, 500);
        this.setHeight = this.setWidth * .6 - this.xPadding;
      }
    }
    // console.log('---set dimensions---');
    // console.log('width: ' + this.width);
    // console.log('height: ' + this.height);
    // console.log('--------------------');
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

  private bindWindowResizeEvent(): void {
    const source = observableFromEvent(window, 'resize');
    const subscription = source.pipe(debounceTime(200)).subscribe(e => {
      console.log('window has been resized new.');
      this.doAll(false);
      // if (this.cd) {
      //   this.cd.markForCheck();
      // }
    });
    this.resizeSubscription = subscription;
  }

  private doAll(animate = true) {
    this.data = JSON.parse(JSON.stringify(this.data));
    this.componentID = this.globalParametersService.addNewComponent();
    this.setDimensions();
    this.data.sort((a, b) => a.value > b.value ? -1 : a.value < b.value ? 1 : 0);
    this.setColors();
    this.donutChartService.setValues({
      componentID: this.componentID,
      width: this.setWidth,
      height: this.setHeight,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    // console.log('x: ' + this.x);
    this.donutRadius = this.donutChartService.donutRadius;
    this.donutInnerRadius = (1 - this.donutWidthPerc) * this.donutChartService.donutRadius;
    this.hoverDonutRadius = this.donutChartService.donutRadius * 1.05;
    this.hoverDonutInnerRadius = this.donutInnerRadius;

    // this.generateDonutSlices();

    let donutCompletion = 0;
    if (!animate) { donutCompletion = 1; }

    const intervalID = setInterval(() => {
      this.generateDonutSlices(donutCompletion);
      this.donutSlicesInit = 1;
      donutCompletion = donutCompletion + 0.01;
      donutCompletion = Math.round(donutCompletion * 100) / 100;
      if (donutCompletion > 1) clearInterval(intervalID);
    }, 5);

    // console.log(this.hoverDonutRadius);
    this.cX = this.xPadding + this.donutRadius;
    this.cY = this.yPadding + this.donutRadius;
    const translateX = this.xPadding + this.donutRadius;
    const translateY = this.yPadding + this.donutRadius;
    this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    const hoverTranslateXY = this.donutRadius * 0.08;
    this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

  ngOnInit() {
    this.doAll();
    // this.data = JSON.parse(JSON.stringify(this.data));
    // this.componentID = this.globalParametersService.addNewComponent();
    // this.setDimensions();
    // this.data.sort((a, b) => a.value > b.value ? -1 : a.value < b.value ? 1 : 0);
    // this.setColors();
    // this.donutChartService.setValues({
    //   componentID: this.componentID,
    //   width: this.width,
    //   height: this.height,
    //   xPadding: this.xPadding,
    //   yPadding: this.yPadding,
    //   data: this.data
    // });
    // // console.log('x: ' + this.x);
    // this.donutRadius = this.donutChartService.donutRadius;
    // this.donutInnerRadius = (1 - this.donutWidthPerc) * this.donutChartService.donutRadius;
    // this.hoverDonutRadius = this.donutChartService.donutRadius * 1.05;
    // this.hoverDonutInnerRadius = this.donutInnerRadius;

    // // this.generateDonutSlices();

    // let donutCompletion = 0;

    // const intervalID = setInterval(() => {
    //   this.generateDonutSlices(donutCompletion);
    //   this.donutSlicesInit = 1;
    //   donutCompletion = donutCompletion + 0.01;
    //   donutCompletion = Math.round(donutCompletion * 100) / 100;
    //   if (donutCompletion > 1) clearInterval(intervalID);
    // }, 5);

    // // console.log(this.hoverDonutRadius);
    // this.cX = this.xPadding + this.donutRadius;
    // this.cY = this.yPadding + this.donutRadius;
    // const translateX = this.xPadding + this.donutRadius;
    // const translateY = this.yPadding + this.donutRadius;
    // this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    // const hoverTranslateXY = this.donutRadius * 0.08;
    // this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

  ngOnChanges() {
    this.doAll();
    // this.data = JSON.parse(JSON.stringify(this.data));
    // this.setDimensions();
    // this.data.sort((a, b) => a.value > b.value ? -1 : a.value < b.value ? 1 : 0);
    // this.setColors();
    // this.donutChartService.setValues({
    //   componentID: this.componentID,
    //   width: this.width,
    //   height: this.height,
    //   xPadding: this.xPadding,
    //   yPadding: this.yPadding,
    //   data: this.data
    // });
    // // console.log('x: ' + this.x);

    // this.donutRadius = this.donutChartService.donutRadius;
    // this.donutInnerRadius = (1 - this.donutWidthPerc) * this.donutChartService.donutRadius;
    // this.hoverDonutRadius = this.donutChartService.donutRadius * 1.05;
    // this.hoverDonutInnerRadius = this.donutInnerRadius;

    // let donutCompletion = 0;
    // const intervalID = setInterval(() => {
    //   this.generateDonutSlices(donutCompletion);
    //   this.donutSlicesInit = 1;
    //   donutCompletion = donutCompletion + 0.01;
    //   donutCompletion = Math.round(donutCompletion * 100) / 100;
    //   if (donutCompletion > 1) clearInterval(intervalID);
    // }, 5);

    // // console.log(this.hoverDonutRadius);
    // this.cX = this.xPadding + this.donutRadius;
    // this.cY = this.yPadding + this.donutRadius;
    // const translateX = this.xPadding + this.donutRadius;
    // const translateY = this.yPadding + this.donutRadius;
    // this.gTranslate = 'translate(' + translateX + 'px, ' + translateY + 'px)';
    // const hoverTranslateXY = this.donutRadius * 0.08;
    // this.hoverTranslate = 'translate(' + hoverTranslateXY + 'px, ' + -hoverTranslateXY + 'px)';
  }

  ngAfterViewInit(): void {
    this.bindWindowResizeEvent();
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

}
