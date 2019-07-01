import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BeautifulChartsService } from '../beautiful-charts.service';
import { BeautifulChartsComponent } from '../beautiful-charts.component';
import { coloSchemes } from '../../constants/color-schemes';

@Component({
  selector: 'g[ngx-line-graph]',
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

  constructor(public beautifulChartsService: BeautifulChartsService) {
  }

  transformData() {
    this.transformedData = [];
    for (const point of this.data) {
      const x = this.beautifulChartsService.transformX(point.x) + this.x;
      const y = this.beautifulChartsService.transformY(this.beautifulChartsService.maxY - point.y) + this.y;
      const toolTipX = x;
      const toolTipY = y - 30;
      const toolTip = point.info && (point.info !== '') ? 'block' : 'none';
      this.transformedData.push({
        x: x,
        y: y,
        info: point.info,
        originalX: point.x,
        originalY: point.y,
        toolTipTranslate: 'translate(' + toolTipX + 'px, ' + toolTipY + 'px)',
        toolTip: toolTip
      });
    }
    console.log(this.transformedData);
  }

  printAllInput() {
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('x: ' + this.x);
    console.log('y: ' + this.y);
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
    if (!this.color) this.color = coloSchemes[this.beautifulChartsService.colorScheme][0];
  }

  ngOnInit() {
    console.log('init..');
    this.transformData();
    this.setLinePath();
    this.setColor();
  }

  ngOnChanges() {
    console.log('changes..');
    this.transformData();
    this.setLinePath();
    this.setColor();
  }

}
