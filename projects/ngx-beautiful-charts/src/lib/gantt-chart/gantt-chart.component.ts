import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';
import { coloSchemes } from '../../constants/color-schemes';
import { GanttChartService } from './gantt-chart.service';
import { GlobalParametersService } from '../../global/global-parameters.service';

@Component({
  selector: 'ngx-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
  providers: [GanttChartService]
})
export class GanttChartComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() width: number;
  @Input() colorScheme = 'colorful';

  componentID;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  height: number;
  phaseTimelines;

  setDimensions() {
    if (this.width) this.height = this.width - this.xPadding;
    else {
      const host = this.currentElement.nativeElement;
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.width = dims.width;
        this.height = this.width - this.xPadding;
      }
    }
    console.log('---set dimensions---');
    console.log('width: ' + this.width);
    console.log('height: ' + this.height);
    console.log('--------------------');
  }

  setColors() {
    let cnt = 0;
    for (const team of this.data) {
      if (!team.color) team.color = coloSchemes[this.colorScheme][cnt % 10];
      cnt++;
    }
  }

  definePhaseTimelines() {
    this.phaseTimelines = {};
    for (const phase of this.ganttChartService.ganttPhases) {
      this.phaseTimelines[phase] = [];
    }

    for (const team of this.ganttChartService.data) {
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
  //   for (const team of this.ganttChartService.data) {
  //     if (!team.color) team.color = coloSchemes[this.ganttChartService.colorScheme][cnt % 10];
  //     cnt++;
  //   }
  // }

  constructor(public ganttChartService: GanttChartService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) { }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    this.setDimensions();
    this.setColors();
    this.ganttChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.height = this.ganttChartService.height;
    this.definePhaseTimelines();
  }

  ngOnChanges() {
    this.setDimensions();
    this.setColors();
    this.ganttChartService.setValues({
      componentID: this.componentID,
      width: this.width,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.height = this.ganttChartService.height;
    this.definePhaseTimelines();
  }

}
