import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { RegularChartsService } from '../regular-charts.service';

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
  @Input() xAxisTitle: string;
  @Input() yAxisTitle: string;
  
  
  gridID: string;
  gridPath: string;

  computeGrid() {
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;
  }

  constructor(public regularChartsService: RegularChartsService) { }

  ngOnInit() {
    this.computeGrid();
    this.gridID = 'grid' + this.regularChartsService.componentID;
  }

  ngOnChanges() {
    this.computeGrid();
  }

}
