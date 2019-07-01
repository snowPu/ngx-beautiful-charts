import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BeautifulChartsService } from '../beautiful-charts.service';
import { BeautifulChartsComponent } from '../beautiful-charts.component';
import { coloSchemes } from '../../constants/color-schemes';


@Component({
  selector: 'g[ngx-multi-line-graph]',
  templateUrl: './multi-line-graph.component.html',
  styleUrls: ['./multi-line-graph.component.scss']
})
export class MultiLineGraphComponent implements OnInit, OnChanges {

  @Input() data: [{name: string, color: string, data: [{x: number, y: number, info: any }]}];
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  // graphLinePaths;
  // transformedData = [];

  // transformData() {
  //   this.transformedData = [];
  //   for (const singleLine of this.data) {
  //     let lineData;

  //     lineData = [];
  //     for (const point of singleLine.data) {
  //       lineData.push({
  //         x: this.beautifulChartsService.transformX(point.x) + this.x,
  //         y: this.beautifulChartsService.transformY(this.beautifulChartsService.maxY - point.y) + this.y,
  //         info: point.info,
  //         originalX: point.x,
  //         originalY: point.y
  //       });
  //     }
  //     this.transformedData.push({
  //       name: singleLine.name,
  //       color: singleLine.color,
  //       data: lineData
  //     });

  //   }
  // }

  // setLinePath() {
  //   // console.log(this.printAllInput());
  //   this.graphLinePaths = [];
  //   for (const singleLine of this.transformedData) {
  //     let graphLinePath = 'M';
  //     let singleLineData;
  //     singleLineData = singleLine.data;
  //     singleLineData.sort((a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
  //     for (const point of singleLineData) {
  //       console.log(point);
  //       const coordX = point.x;
  //       const coordY = point.y;

  //       graphLinePath += ' ' + coordX + ' ' + coordY;

  //       console.log(graphLinePath);
  //     }

  //     this.graphLinePaths.push({
  //       color: singleLine.color,
  //       path: graphLinePath
  //     });
  //   }
  // }


  constructor(public beautifulChartsService: BeautifulChartsService) {
  }

  setColors() {
    let cnt = 0;
    for (let line of this.data) {
      if (!line.color) line.color = coloSchemes[this.beautifulChartsService.colorScheme][cnt % 10];
      cnt++;
    }
  }

  ngOnInit() {
    console.log('init..');
    this.setColors();
    // this.transformData();
    // this.setLinePath();
  }

  ngOnChanges() {
    console.log('changes..');
    this.setColors();
    // this.transformData();
    // this.setLinePath();
  }

}
