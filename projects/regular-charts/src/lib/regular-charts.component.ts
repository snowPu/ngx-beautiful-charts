import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rc-regular-charts',
  templateUrl: './regular-charts.component.html',
  styles: []
})
export class RegularChartsComponent implements OnInit {

  @Input() width: number;
  @Input() height: number;

  constructor() { }

  ngOnInit() {
  }

}
