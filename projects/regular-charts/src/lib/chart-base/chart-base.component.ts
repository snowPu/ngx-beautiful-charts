import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'g[rc-chart-base]',
  templateUrl: './chart-base.component.html',
  styleUrls: ['./chart-base.component.scss']
})
export class ChartBaseComponent implements OnInit, OnChanges {

  @Input() gridWidthX: number;
  @Input() gridWidthY: number;
  @Input() width: number;
  @Input() height: number;
  @Input() xPadding: number;
  @Input() yPadding: number;
  @Input() xAxis;
  @Input() yAxis;

  gridPath: string;

  computeGrid() {
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
  }

  constructor() { }

  ngOnInit() {
    this.computeGrid();
  }

  ngOnChanges() {
    this.computeGrid();
  }

}
