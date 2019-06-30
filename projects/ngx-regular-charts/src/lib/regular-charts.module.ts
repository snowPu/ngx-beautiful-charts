import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RegularChartsComponent } from './regular-charts.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { ChartBaseComponent } from './chart-base/chart-base.component';
import { MultiLineGraphComponent } from './multi-line-graph/multi-line-graph.component';
import { LgChartBaseComponent } from './chart-base/lg-chart-base/lg-chart-base.component';
import { MlgChartBaseComponent } from './chart-base/mlg-chart-base/mlg-chart-base.component';
import { BcChartBaseComponent } from './chart-base/bc-chart-base/bc-chart-base.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ClusteredBarChartComponent } from './clustered-bar-chart/clustered-bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PieChartBaseComponent } from './chart-base/pie-chart-base/pie-chart-base.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { SunburstChartComponent } from './sunburst-chart/sunburst-chart.component';

@NgModule({
  declarations: [RegularChartsComponent,
    LineGraphComponent, ChartBaseComponent,
    MultiLineGraphComponent, LgChartBaseComponent,
    MlgChartBaseComponent, BcChartBaseComponent,
    BarChartComponent, ClusteredBarChartComponent,
    PieChartComponent, PieChartBaseComponent,
    DonutChartComponent, SunburstChartComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [RegularChartsComponent]
})
export class RegularChartsModule { }
