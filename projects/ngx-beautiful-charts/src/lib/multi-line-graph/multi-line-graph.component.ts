import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { coloSchemes } from '../../constants/color-schemes';
import { MultiLineGraphService } from './multi-line-graph.service';
import { GlobalParametersService } from '../../global/global-parameters.service';


@Component({
  selector: 'ngx-multi-line-graph',
  templateUrl: './multi-line-graph.component.html',
  styleUrls: ['./multi-line-graph.component.scss'],
  providers: [MultiLineGraphService]
})
export class MultiLineGraphComponent implements OnInit, OnChanges {

  @Input() data: [{name: string, color: string, data: [{x: number, y: number, info: any }]}];
  @Input() width: number;
  @Input() height: number;
  @Input() colorScheme: string;
  @Input() minX: number = null;
  @Input() minY: number = null;
  @Input() maxX: number = null;
  @Input() maxY: number = null;
  @Input() gridPrecisionX: number;
  @Input() gridPrecisionY: number;
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;

  componentID: number;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  dataCopy;
  graphLinePaths;
  transformedData = [];

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
    console.log('---set dimensions---');
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('--------------------');
  }

  setMinandMax() {
    if (this.minX == null) this.minX = Math.min(...this.data.map(line => Math.min(...line.data.map(oneData => oneData.x))));
    if (this.maxX == null) this.maxX = Math.max(...this.data.map(line => Math.max(...line.data.map(oneData => oneData.x))));
    if (this.minY == null) this.minY = Math.min(...this.data.map(line => Math.min(...line.data.map(oneData => oneData.y))));
    if (this.maxY == null) this.maxY = Math.max(...this.data.map(line => Math.max(...line.data.map(oneData => oneData.y))));
  }


  transformData() {
    this.transformedData = [];
    for (const singleLine of this.data) {
      let lineData;

      lineData = [];
      for (const point of singleLine.data) {
        const x = this.multiLineGraphService.transformX(point.x) + this.xPadding;
        const y = this.multiLineGraphService.transformY(this.multiLineGraphService.maxY - point.y) + this.yPadding;
        const toolTipX = x;
        const toolTipY = y - 30;
        const toolTip = point.info && (point.info !== '') ? 'block' : 'none';
        lineData.push({
          x,
          y,
          info: point.info,
          originalX: point.x,
          originalY: point.y,
          toolTipTranslate: 'translate(' + toolTipX + 'px, ' + toolTipY + 'px)',
          toolTip
        });
      }
      this.transformedData.push({
        name: singleLine.name,
        color: singleLine.color,
        data: lineData
      });

    }
  }

  setLinePath() {
    // console.log(this.printAllInput());
    this.graphLinePaths = [];
    for (const singleLine of this.transformedData) {
      let graphLinePath = 'M';
      let singleLineData;
      singleLineData = singleLine.data;
      singleLineData.sort((a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
      for (const point of singleLineData) {
        console.log(point);
        const coordX = point.x;
        const coordY = point.y;

        graphLinePath += ' ' + coordX + ' ' + coordY;

        console.log(graphLinePath);
      }

      this.graphLinePaths.push({
        color: singleLine.color,
        path: graphLinePath
      });
    }
  }


  constructor(public multiLineGraphService: MultiLineGraphService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) {
  }

  setColors() {
    let cnt = 0;
    for (const line of this.data) {
      if (!line.color) line.color = coloSchemes[this.colorScheme][cnt % 10];
      cnt++;
    }
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    console.log('init..');
    this.setDimensions();
    this.setMinandMax();
    this.setColors();
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.multiLineGraphService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      dataLength: this.data.length,
      xPadding: this.xPadding,
      yPadding: this.yPadding
    });

    this.transformData();
    this.setLinePath();
  }

  ngOnChanges() {
    console.log('changes..');
    this.setMinandMax();
    this.setColors();
    this.dataCopy = JSON.parse(JSON.stringify(this.data));
    this.multiLineGraphService.setValues({
      componentID: this.componentID,
      width: this.width,
      height: this.height,
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      dataLength: this.data.length,
      xPadding: this.xPadding,
      yPadding: this.yPadding
    });

    this.transformData();
    this.setLinePath();
  }

}
