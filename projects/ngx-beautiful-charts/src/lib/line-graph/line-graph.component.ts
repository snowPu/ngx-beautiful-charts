import { Component, ElementRef, OnInit, Input, OnChanges, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { colorSchemes } from '../../constants/color-schemes';
import { GlobalParametersService } from '../../global/global-parameters.service';
import { LineGraphService } from './line-graph.service';
import { fromEvent as observableFromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
  providers: [LineGraphService]
})
export class LineGraphComponent implements OnInit, OnChanges {

  @Input() data: [{x: number, y: number, info: any }] = null;
  @Input() chartBase = true;
  @Input() width: number;
  @Input() height: number;
  @Input() color: string;
  @Input() colorScheme: string;
  @Input() minX: number = null;
  @Input() minY: number = null;
  @Input() maxX: number = null;
  @Input() maxY: number = null;
  @Input() gridPrecisionX: number;
  @Input() gridPrecisionY: number;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  @Input() customColorScheme: string[] = [];


  componentID: number;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  graphLinePath: string;
  dataCopy;
  transformedData;
  resizeSubscription: Subscription;
  setWidth = 0;
  setHeight = 0;

  constructor(public lineGraphService: LineGraphService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) {
  }

  private bindWindowResizeEvent(): void {
    const source = observableFromEvent(window, 'resize');
    const subscription = source.pipe(debounceTime(200)).subscribe(e => {
      console.log('window has been resized.');
      this.doAll();
      // if (this.cd) {
      //   this.cd.markForCheck();
      // }
    });
    this.resizeSubscription = subscription;
  }

  setPadding() {
    this.xPadding = this.setWidth * 0.07 + 10;
    this.yPadding = this.setHeight * 0.04 + 10;
  }


  setDimensions() {
    if (this.width && this.height) {
      this.setWidth = this.width;
      this.setHeight = this.height;
    } else if (this.width && !this.height) {
      this.setWidth = this.width;
      this.setHeight = this.width / 2;
      console.log('1');
    } else if (!this.width && this.height) {
      this.setHeight = this.height;
      this.setWidth = this.height * 2;
      console.log('2');
    } else if (!this.width && !this.height) {
      const host = this.currentElement.nativeElement;
      console.log('3');
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.setWidth = Math.max(dims.width, 400);
        this.setHeight = Math.max(dims.width / 2, 200);
        // console.log('3-1');
        // console.log('width: ' + this.setWidth);
        // console.log('height: ' + this.setHeight);
      }
    }
    this.setPadding();
    // if (this.cd) {
    //   this.cd.markForCheck();
    // }
    // console.log('---set dimensions---');
    // console.log('width: ' + this.width);
    // console.log('height: ' + this.height);
    // console.log('--------------------');
  }

  setMinandMax() {
    if (this.minX == null) this.minX = Math.min(...this.data.map(oneData => oneData.x));
    if (this.maxX == null) this.maxX = Math.max(...this.data.map(oneData => oneData.x));
    if (this.minY == null) this.minY = Math.min(...this.data.map(oneData => oneData.y));
    if (this.maxY == null) this.maxY = Math.max(...this.data.map(oneData => oneData.y));
  }

  transformData() {
    this.transformedData = [];
    for (const point of this.data) {
      const x = this.lineGraphService.transformX(point.x) + this.xPadding;
      const y = this.lineGraphService.transformY(this.lineGraphService.maxY - point.y) + this.yPadding;
      const toolTipX = x;
      const toolTipY = y - 30;
      const toolTip = point.info && (point.info !== '') ? 'block' : 'none';
      this.transformedData.push({
        x,
        y,
        info: point.info,
        originalX: point.x,
        originalY: point.y,
        toolTipTranslate: 'translate(' + toolTipX + 'px, ' + toolTipY + 'px)',
        toolTip
      });
    }
    // console.log(this.transformedData);
  }

  printAllInput() {
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('minX: ' + this.minX);
    console.log('maxX: ' + this.maxX);
    console.log('minY: ' + this.minY);
    console.log('maxY: ' + this.maxY);
    console.log('x: ' + this.xPadding);
    console.log('y: ' + this.yPadding);
    console.log('data: ' + this.data);
  }


  setLinePath() {
    // console.log(this.printAllInput());
    this.graphLinePath = 'M';

    this.data.sort((a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
    for (const point of this.transformedData) {
      // console.log(point);
      const coordX = point.x;
      const coordY = point.y;

      this.graphLinePath += ' ' + coordX + ' ' + coordY;

      // console.log(this.graphLinePath);
    }
  }

  setColor() {
    if (!this.color) {
      if (this.customColorScheme.length > 0) {
        this.color = this.customColorScheme[0];
      } else {
        this.color = colorSchemes[this.colorScheme][0];
      }
    }
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    // console.log('init..');
    // this.setDimensions();
    // // this.printAllInput();
    // this.setMinandMax();
    // // this.printAllInput();
    // this.dataCopy = JSON.parse(JSON.stringify(this.data));
    // this.lineGraphService.setValues({
    //   componentID: this.componentID,
    //   width: this.setWidth,
    //   height: this.setHeight,
    //   minX: this.minX,
    //   maxX: this.maxX,
    //   minY: this.minY,
    //   maxY: this.maxY,
    //   xPadding: this.xPadding,
    //   yPadding: this.yPadding
    // });

    // this.setColor();
    // this.transformData();
    // this.setLinePath();
    this.doAll();
  }

  ngOnChanges() {
    // console.log('changes..');
    // this.printAllInput();
    this.doAll();
  }

  doAll() {
    this.setDimensions();
    this.setMinandMax();
    // this.printAllInput();

    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.lineGraphService.setValues({
      componentID: this.componentID,
      width: this.setWidth,
      height: this.setHeight,
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      xPadding: this.xPadding,
      yPadding: this.yPadding
    });

    this.setColor();
    this.transformData();
    this.setLinePath();
  }


  // ngAfterViewInit(): void {
  //   // this.bindWindowResizeEvent();
  // }

  // ngOnDestroy() {
  //   this.resizeSubscription.unsubscribe();
  // }

}
