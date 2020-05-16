import { Component, OnInit, Input, OnChanges, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { colorSchemes } from '../../constants/color-schemes';
import { BarChartService } from './bar-chart.service';
import { GlobalParametersService } from '../../global/global-parameters.service';
import { fromEvent as observableFromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  providers: [BarChartService]
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  // <h4>Bar Chart</h4>
  // <ngx-beautiful-charts [width]="1100" [height]="400"
  // [displayXAxis]="true"
  // [displayYAxis]="true"
  // xAxisTitle="City"
  // yAxisTitle="Value"
  // [data]="barChartData"
  // chartType="bar-chart" [showGridLines]="true"></ngx-beautiful-charts>

  @Input() data: [{name: string, value: number }];
  @Input() width: number;
  @Input() height: number;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() showGridLines = false;
  @Input() color: string;
  @Input() colorScheme = 'colorful';
  @Input() customColorScheme: string[] = [];

  setWidth: number;
  setHeight: number;
  componentID: number;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  barPaths: string[];
  dataCopy;
  resizeSubscription: Subscription;


  setPadding() {
    this.xPadding = this.setWidth * 0.07 + 10;
    this.yPadding = this.setHeight * 0.04 + 10;
  }

  computeBarPaths() {
    this.barPaths = [];
    const noOfXAxisValues = this.data.length;
    const eachWidth = this.barChartService.rectWidth / noOfXAxisValues;
    const barWidth = eachWidth * .25;
    let cnt = -1;
    let barPath = '';
    for (const bcD of this.data) {
      cnt ++;
      const xPos = cnt * eachWidth + eachWidth / 2 + this.xPadding;
      const yPos = this.barChartService.transformY(this.barChartService.maxY - bcD.value) + this.yPadding;

      const xStart = xPos - barWidth / 2;
      const xEnd = xPos + barWidth / 2;
      const yStart = this.barChartService.rectHeight + this.yPadding;
      barPath = 'M ';
      barPath = barPath + ' ' + xStart + ' ' + yStart + ' L ' + xStart
      + ' ' + yPos + ' ' + xEnd + ' ' + yPos + ' ' + xEnd + ' ' + yStart + ' Z';

      this.barPaths.push(barPath);
    }

  }

  constructor(public barChartService: BarChartService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) { }

  setColor() {
    if (!this.color) {
      if (this.customColorScheme.length > 0) {
        this.color = this.customColorScheme[0];
      } else {
        this.color = colorSchemes[this.colorScheme][0];
      }
    }
  }

  setDimensions() {
    if (this.width && this.height) {
      this.setWidth = this.width;
      this.setHeight = this.height;
    } else if (this.width && !this.height) this.setHeight = this.width / 2;
    else if (!this.width && this.height) this.setWidth = this.height * 2;
    else if (!this.width && !this.height) {
      const host = this.currentElement.nativeElement;
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.setWidth = Math.max(dims.width, 400);
        this.setHeight = Math.max(dims.width / 2, 300);
      }
    }
    this.setPadding();
    // console.log('---set dimensions---');
    // console.log('width: ' + this.setWidth);
    // console.log('height: ' + this.setHeight);
    // console.log('--------------------');
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    this.doAll();
  }

  ngOnChanges() {
    this.doAll();
  }

  doAll() {
    this.setDimensions();
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.barChartService.setValues({
      componentID: this.componentID,
      width: this.setWidth,
      height: this.setHeight,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.setColor();
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
