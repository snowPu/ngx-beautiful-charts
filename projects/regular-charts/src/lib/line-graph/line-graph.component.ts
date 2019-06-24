import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RegularChartsService } from '../regular-charts.service';
import { RegularChartsComponent } from '../regular-charts.component';

@Component({
  selector: 'g[rc-line-graph]',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit, OnChanges {

  @Input() data: [{x: number, y: number, info: any }];
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @Input() color: string;


  graphLinePath: string;
  transformedData;

  constructor(public regularChartsService: RegularChartsService) {
  }

  transformData() {
    this.transformedData = [];
    for (const point of this.data) {
      this.transformedData.push({
        x: this.regularChartsService.transformX(point.x) + this.x,
        y: this.regularChartsService.transformY(this.regularChartsService.maxY - point.y) + this.y,
        info: point.info,
        originalX: point.x,
        originalY: point.y
      });
    }
  }

  printAllInput() {
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('x: ' + this.x);
    console.log('y: ' + this.y);
    console.log('data: ' + this.data);
  }


  setLinePath() {
    console.log(this.printAllInput());
    this.graphLinePath = 'M';

    this.data.sort((a, b) => a.x < b.x ? -1 : a.x > b.x ? 1 : 0);
    for (const point of this.transformedData) {
      console.log(point);
      const coordX = point.x;
      const coordY = point.y;

      this.graphLinePath += ' ' + coordX + ' ' + coordY;

      console.log(this.graphLinePath);
    }
  }

  ngOnInit() {
    console.log('init..');
    this.transformData();
    this.setLinePath();
  }

  ngOnChanges() {
    console.log('changes..');
    this.transformData();
    this.setLinePath();
  }

}
