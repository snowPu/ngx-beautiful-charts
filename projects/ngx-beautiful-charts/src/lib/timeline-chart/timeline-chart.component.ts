import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BeautifulChartsService } from '../beautiful-charts.service';
import { coloSchemes } from '../../constants/color-schemes';

@Component({
  selector: 'g[ngx-timeline-chart]',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;

  gTranslate: string;

  barWidth: number;
  barStartY: number;
  barEndY: number;

  timeBubbleRadius: number;
  textBlockHeight: number;
  timeData = [];


  dataRefined: any;
  sunSlices: any;
  sunSliceWidth: number;
  levelSunSlices: any;
  sunRadius: number;
  sunDepth = 0;
  hoverPieRadius: number;
  cX: number;
  cY: number;
  hoverTranslate: string;


  computeBarDimensions() {
    this.barWidth = this.height * .05;
    this.barStartY = this.y + this.height / 2 - this.barWidth / 2;
    this.barEndY = this.y + this.height / 2 + this.barWidth / 2;
  }

  setColors() {
    let cnt = 0;
    for (let oneTimeData of this.data) {
      if (!oneTimeData.color) oneTimeData.color = coloSchemes[this.beautifulChartsService.colorScheme][cnt % 10];
      cnt++;
    }
  }

  textWrap(text, width) {
    const noOfCharactersPerLine = width / 10;
    const newLineStr = '\n';
    let done = false;
    let res = [];
    do {
      let found = false;
      for (let i = noOfCharactersPerLine - 1; i >= 0; i--) {
          if ((text.charAt(i)  === ' ')) {
              res.push([text.slice(0, i), newLineStr].join(''));
              text = text.slice(i + 1);
              found = true;
              break;
          }
      }
      if (!found) {
          res.push([text.slice(0, noOfCharactersPerLine), newLineStr].join(''));
          text = text.slice(noOfCharactersPerLine);
      }
      if (text.length < noOfCharactersPerLine) done = true;
    } while (!done);
    res.push(text);
    return res;
  }

  computeTimeData() {
    // const distanceBetweenTimeBubbles = this.width * .8 / (this.data.length - 1);
    const minTime = Math.min(...this.data.map(timeData => timeData.time));
    const maxTime = Math.max(...this.data.map(timeData => timeData.time));
    const perTimeWidth = this.width * .8 / (maxTime - minTime);
    this.data.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
    let diffs = [];
    for (let i = 1; i < this.data.length; i++) {
      diffs.push(this.data[i].time - this.data[i - 1].time);
    }
    const minDiff = Math.min(...diffs);
    this.timeBubbleRadius = Math.min(minDiff * perTimeWidth * .4);
    const maxRadius = this.width * .8 / (this.data.length - 1) * .25;
    const minRadius = this.width * .8 * .04;

    console.log('max: ' + maxRadius);
    console.log('min: ' + minRadius);


    if (this.timeBubbleRadius > maxRadius) this.timeBubbleRadius = maxRadius;
    if (this.timeBubbleRadius < minRadius) this.timeBubbleRadius = minRadius;
    this.textBlockHeight = this.height * 2 / 16;
    this.timeData = [];
    let cnt = 0;
    let up = 1;
    for (const oneTimeData of this.data) {
      const color = oneTimeData.color;
      const x = (oneTimeData.time - minTime) * perTimeWidth;
      const timeBubble = {
        centre: {
          x,
          y: this.barStartY + this.barWidth / 2
        },
        text: oneTimeData.displayTime ? oneTimeData.displayTime : oneTimeData.time
        // oneTimeData.displayTime ?
        // this.textWrap(oneTimeData.displayTime, this.timeBubbleRadius * 2) :
        // [oneTimeData.time]
      };
      const start = {
        x,
        y: (up === 1) ? this.barStartY : this.barEndY
      };
      const end = {
        x,
        y: (up === 1) ? this.barStartY - this.height / 4 : this.barEndY + this.height / 4
      };
      const line = 'M ' + start.x + ' ' + start.y + ' ' + end.x + ' ' + end.y;

      const textBlock = {
        position: {
          x,
          y: (up === 1) ? this.barStartY - this.height * 7 / 16 : this.barEndY + this.height * 4 / 16
        },
        text: this.textWrap(oneTimeData.text, this.timeBubbleRadius * 4)
      };
      this.timeData.push({
        timeBubble,
        line,
        textBlock,
        color
      });
      up = up * -1;
      cnt++;
    }
  }

  constructor(public beautifulChartsService: BeautifulChartsService) {
  }

  ngOnInit() {
    const transX = this.x + this.width * .1;
    this.gTranslate = 'translate(' + transX + 'px, ' + this.y + 'px)';
    this.setColors();
    this.computeBarDimensions();
    this.computeTimeData();
  }

  ngOnChanges() {
    const transX = this.x + this.width * .1;
    this.gTranslate = 'translate(' + transX + 'px, ' + this.y + 'px)';
    this.setColors();
    this.computeBarDimensions();
    this.computeTimeData();
  }
}
