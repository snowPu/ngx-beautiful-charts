import { Component, ElementRef, OnInit, Input, OnChanges } from '@angular/core';
import { colorSchemes } from '../../constants/color-schemes';
import { GlobalParametersService } from '../../global/global-parameters.service';
import { LineGraphService } from './line-graph.service';

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
  @Input() colorScheme = 'colorful';
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

  constructor(public lineGraphService: LineGraphService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) {
  }

  setDimensions() {
    if (this.width && !this.height) this.height = this.width / 3;
    else if (!this.width && this.height) this.width = this.height * 3;
    else if (!this.width && !this.height) {
      const host = this.currentElement.nativeElement;
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.width = dims.width;
        this.height = dims.width / 3;
      }
    }
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
    this.setDimensions();
    // this.printAllInput();
    this.setMinandMax();
    // this.printAllInput();
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.lineGraphService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
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

  ngOnChanges() {
    // console.log('changes..');
    // this.printAllInput();
    this.setMinandMax();
    // this.printAllInput();

    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.lineGraphService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
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

}
