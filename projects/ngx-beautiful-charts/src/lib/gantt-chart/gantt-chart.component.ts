import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { BeautifulChartsService } from '../beautiful-charts.service';
import { coloSchemes } from '../../constants/color-schemes';

@Component({
  selector: 'g[ngx-gantt-chart]',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit, OnChanges {

  @Input() x: number;
  @Input() y: number;
  @Input() data;

  phaseTimelines;

  definePhaseTimelines() {
    this.phaseTimelines = {};
    for (let phase of this.beautifulChartsService.ganttPhases) {
      this.phaseTimelines[phase] = [];
    }

    for (const team of this.beautifulChartsService.data) {
      for (const phase of Object.keys(team.timelines)) {
        for (const timeline of team.timelines[phase]) {
          this.phaseTimelines[phase].push({from: timeline.from, 
            to: timeline.to,
            color: team.color,
            info: timeline.info,
            toolTip: (timeline.info ? 'block' : 'none')});
        }
      }
    }
    console.log('phase timelines: ');
    console.log(this.phaseTimelines);
  }

  // setColors() {
  //   let cnt = 0;
  //   for (const team of this.beautifulChartsService.data) {
  //     if (!team.color) team.color = coloSchemes[this.beautifulChartsService.colorScheme][cnt % 10];
  //     cnt++;
  //   }
  // }

  constructor(public beautifulChartsService: BeautifulChartsService) { }

  ngOnInit() {
    // this.setColors();
    this.definePhaseTimelines();
  }

  ngOnChanges() {
    this.definePhaseTimelines();
  }

}
