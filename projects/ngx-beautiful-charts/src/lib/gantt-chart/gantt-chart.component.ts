import { Component, OnInit, OnChanges, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { colorSchemes } from '../../constants/color-schemes';
import { GanttChartService } from './gantt-chart.service';
import { GlobalParametersService } from '../../global/global-parameters.service';
import { fromEvent as observableFromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
  providers: [GanttChartService]
})
export class GanttChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() data;
  @Input() width: number;
  @Input() colorScheme = 'colorful';
  @Input() customColorScheme: string[] = [];

  componentID;
  xPadding = 60;
  yPadding = this.xPadding / 2;
  height: number;
  phaseTimelines;

  setWidth = 0;
  setHeight = 0;
  resizeSubscription: Subscription;

  setDimensions() {
    if (this.width) {
      this.setWidth = this.width;
      this.setHeight = this.setWidth - this.xPadding;
    } else {
      const host = this.currentElement.nativeElement;
      if (host.parentNode != null) {
        const dims = host.parentNode.getBoundingClientRect();
        this.setWidth = Math.max(dims.width, 400);
        this.setHeight = Math.max(this.setWidth - this.xPadding);
      }
    }
    // console.log('---set dimensions---');
    // console.log('width: ' + this.width);
    // console.log('height: ' + this.height);
    // console.log('--------------------');
  }

  setColors() {
    let cnt = 0;
    for (const team of this.data) {
      if (!team.color) {
        if (this.customColorScheme.length > 0) {
          team.color = this.customColorScheme[cnt % this.customColorScheme.length];
        } else {
          team.color = colorSchemes[this.colorScheme][cnt % 10];
        }
        cnt++;
      }
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
    // console.log('phase timelines: ');
    // console.log(this.phaseTimelines);
  }

  // setColors() {
  //   let cnt = 0;
  //   for (const team of this.ganttChartService.data) {
  //     if (!team.color) team.color = colorSchemes[this.ganttChartService.colorScheme][cnt % 10];
  //     cnt++;
  //   }
  // }

  constructor(public ganttChartService: GanttChartService,
              private globalParametersService: GlobalParametersService,
              private currentElement: ElementRef) { }

  private bindWindowResizeEvent(): void {
    const source = observableFromEvent(window, 'resize');
    const subscription = source.pipe(debounceTime(200)).subscribe(e => {
      console.log('window has been resized new.');
      this.doAll();
      // if (this.cd) {
      //   this.cd.markForCheck();
      // }
    });
    this.resizeSubscription = subscription;
  }

  doAll() {
    this.setDimensions();
    this.setColors();
    this.ganttChartService.setValues({
      componentID: this.componentID,
      width: this.setWidth,
      xPadding: this.xPadding,
      yPadding: this.yPadding,
      data: this.data
    });
    this.height = this.ganttChartService.height;
    this.definePhaseTimelines();
  }

  ngOnInit() {
    this.componentID = this.globalParametersService.addNewComponent();
    this.doAll();
  }

  ngOnChanges() {
    this.doAll();
  }

  ngAfterViewInit(): void {
    this.bindWindowResizeEvent();
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

}
