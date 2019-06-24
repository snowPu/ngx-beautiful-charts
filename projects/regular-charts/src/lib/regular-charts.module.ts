import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RegularChartsComponent } from './regular-charts.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { ChartBaseComponent } from './chart-base/chart-base.component';
import { MultiLineGraphComponent } from './multi-line-graph/multi-line-graph.component';

@NgModule({
  declarations: [RegularChartsComponent, LineGraphComponent, ChartBaseComponent, MultiLineGraphComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [RegularChartsComponent]
})
export class RegularChartsModule { }
