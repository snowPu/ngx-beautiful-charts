import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { LgChartBaseComponent } from './line-graph/lg-chart-base/lg-chart-base.component';
// import { ChartBaseComponent } from './chart-base/chart-base.component';
import { MultiLineGraphComponent } from './multi-line-graph/multi-line-graph.component';
import { MlgChartBaseComponent } from './multi-line-graph/mlg-chart-base/mlg-chart-base.component';
// import { LgChartBaseComponent } from './chart-base/lg-chart-base/lg-chart-base.component';
// import { MlgChartBaseComponent } from './chart-base/mlg-chart-base/mlg-chart-base.component';
// import { BcChartBaseComponent } from './chart-base/bc-chart-base/bc-chart-base.component';
// import { PieChartBaseComponent } from './chart-base/pie-chart-base/pie-chart-base.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BcChartBaseComponent } from './bar-chart/bc-chart-base/bc-chart-base.component';
import { ClusteredBarChartComponent } from './clustered-bar-chart/clustered-bar-chart.component';
import { CbcChartBaseComponent } from './clustered-bar-chart/cbc-chart-base/cbc-chart-base.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PieChartBaseComponent } from './pie-chart/pie-chart-base/pie-chart-base.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { DonutChartBaseComponent } from './donut-chart/donut-chart-base/donut-chart-base.component';
import { SunburstChartComponent } from './sunburst-chart/sunburst-chart.component';
// import { GcChartBaseComponent } from './chart-base/gc-chart-base/gc-chart-base.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { GcChartBaseComponent } from './gantt-chart/gc-chart-base/gc-chart-base.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';

@NgModule({
  declarations: [
    LineGraphComponent,
    MultiLineGraphComponent, LgChartBaseComponent,
    MlgChartBaseComponent, BcChartBaseComponent,
    CbcChartBaseComponent, DonutChartBaseComponent,
    BarChartComponent, ClusteredBarChartComponent,
    PieChartComponent, PieChartBaseComponent,
    DonutChartComponent, SunburstChartComponent, GcChartBaseComponent,
    GanttChartComponent, TimelineChartComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    LineGraphComponent,
    MultiLineGraphComponent,
    BarChartComponent,
    ClusteredBarChartComponent,
    PieChartComponent,
    DonutChartComponent,
    SunburstChartComponent,
    GanttChartComponent,
    TimelineChartComponent]
})
export class BeautifulChartsModule { }
