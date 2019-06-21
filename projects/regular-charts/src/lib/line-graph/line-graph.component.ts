import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'g[rc-line-graph]',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;


  graphLinePath: string;

  constructor() { }

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
    for (const point of this.data) {
      console.log(point);
      const coordX = point.x;
      const coordY = point.y;

      this.graphLinePath += ' ' + coordX + ' ' + coordY;

      console.log(this.graphLinePath);
    }
  }

  ngOnInit() {
    console.log('init..');
    this.setLinePath();
  }

  ngOnChanges() {
    console.log('changes..');
    this.setLinePath();
  }

}
