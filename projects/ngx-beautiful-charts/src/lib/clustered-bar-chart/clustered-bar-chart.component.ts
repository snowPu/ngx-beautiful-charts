import { Component, OnInit, OnChanges, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { colorSchemes } from '../../constants/color-schemes';
import { ClusteredBarChartService } from './clustered-bar-chart.service';
import { GlobalParametersService } from '../../global/global-parameters.service';
import { fromEvent as observableFromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-clustered-bar-chart',
  templateUrl: './clustered-bar-chart.component.html',
  styleUrls: ['./clustered-bar-chart.component.scss'],
  providers: [ClusteredBarChartService]
})
export class ClusteredBarChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() data: [{series: string, color: string, data: [{name: string, value: number }]}];
  @Input() width: number;
  @Input() height: number;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() showGridLines = false;
  @Input() colorScheme = 'colorful';
  @Input() customColorScheme: string[] = [];

  setWidth: number;
  setHeight: number;
  componentID: number;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  barPaths: any;
  dataCopy;
  resizeSubscription: Subscription;
  // [{color: string, paths: string[]}];


  setPadding() {
    this.xPadding = this.setWidth * 0.08 + 10;
    this.yPadding = this.setHeight * 0.05 + 10;
  }

  setDimensions() {
    if (this.width && this.height) {
      this.setWidth = this.width;
      this.setHeight = this.height;
    } else if (this.width && !this.height) this.setHeight = this.width / 3;
    else if (!this.width && this.height) this.setWidth = this.height * 3;
    else if (!this.width && !this.height) {
      const host = this.currentElement.nativeElement;
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.setWidth = Math.max(dims.width, 500);
        this.setHeight = Math.max(dims.width / 3, 300);
      }
    }
    this.setPadding();
    console.log('---set dimensions---');
    console.log('width: ' + this.setWidth);
    console.log('height: ' + this.setHeight);
    console.log('--------------------');
  }

  computeBarPaths() {
    this.barPaths = [];
    let uniqueXAxisValues;
    let noOfXAxisValues;
    uniqueXAxisValues = new Set();
    for (const series of this.data) {
      const seriesData = series.data;
      for (const sData of seriesData) {
        uniqueXAxisValues.add(sData.name);
      }
    }
    noOfXAxisValues = uniqueXAxisValues.size;
    const noOfSeries = this.data.length;
    const eachWidth = this.clusteredBarChartService.rectWidth / noOfXAxisValues;
    const categoryWidth = eachWidth * .5;
    const barWidth = categoryWidth / noOfSeries;
    let cnt = -1;
    let barPath = '';
    let cntSeries = -1;
    for (const bcS of this.data) {
      cntSeries++;
      cnt = -1;
      let seriesPaths;
      seriesPaths = [];
      for (const bcD of bcS.data) {
        cnt ++;
        const xPos = cnt * eachWidth + .25 * eachWidth + cntSeries * barWidth + .5 * barWidth + this.xPadding;
        const yPos = this.clusteredBarChartService.transformY(this.clusteredBarChartService.maxY - bcD.value) + this.yPadding;
        const xStart = xPos - barWidth / 2;
        const xEnd = xPos + barWidth / 2;
        const yStart = this.clusteredBarChartService.rectHeight + this.yPadding;
        barPath = 'M ';
        barPath = barPath + ' ' + xStart + ' ' + yStart + ' L ' + xStart
        + ' ' + yPos + ' ' + xEnd + ' ' + yPos + ' ' + xEnd + ' ' + yStart + ' Z';
        seriesPaths.push(barPath);
      }
      this.barPaths.push({color: bcS.color, paths: seriesPaths});
    }
  }

  constructor(public clusteredBarChartService: ClusteredBarChartService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) { }

  setColors() {
    let cnt = 0;
    for (const seriesData of this.data) {
      if (!seriesData.color) {
        if (this.customColorScheme.length > 0) {
          seriesData.color = this.customColorScheme[cnt % this.customColorScheme.length];
        } else {
          seriesData.color = colorSchemes[this.colorScheme][cnt % 10];
        }
        cnt++;
      }
    }
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    console.log('init..');
    this.doAll();
  }

  ngOnChanges() {
    this.doAll();
  }

  private doAll() {
    this.setDimensions();
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.setColors();
    console.log(this.setWidth + '-' + this.setHeight);
    this.clusteredBarChartService.setValues({
      componentID: this.componentID,
      width: this.setWidth,
      height: this.setHeight,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.computeBarPaths();
  }

  private bindWindowResizeEvent(): void {
    const source = observableFromEvent(window, 'resize');
    const subscription = source.pipe(debounceTime(200)).subscribe(e => {
      console.log('window has been resized new - bar chart.');
      this.doAll();
      // if (this.cd) {
      //   this.cd.markForCheck();
      // }
    });
    this.resizeSubscription = subscription;
  }

  ngAfterViewInit(): void {
    this.bindWindowResizeEvent();
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

}
