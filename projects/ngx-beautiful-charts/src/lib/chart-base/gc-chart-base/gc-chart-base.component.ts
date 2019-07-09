import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BeautifulChartsService } from '../../beautiful-charts.service';

@Component({
  selector: 'g[ngx-gc-chart-base]',
  templateUrl: './gc-chart-base.component.html',
  styleUrls: ['./gc-chart-base.component.scss']
})
export class GcChartBaseComponent implements OnInit, OnChanges {

  @Input() width: number;
  @Input() height: number;
  @Input() xPadding: number;
  @Input() yPadding: number;

  gridWidthX: number;
  gridWidthY: number;

  gridPrecisionX: number;

  gridID: string;
  gridPath: string;

  xAxis: any;
  yAxis: any;

  monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];


  addDays(date, days: number) {
    let newdate = new Date(date);
    newdate.setDate((new Date(date)).getDate() + days);
    let day = newdate.getDate();
    let monthIndex = newdate.getMonth();
    let year = newdate.getFullYear();


    return this.monthNames[monthIndex] + ' ' + day + ', ' + year;
  }
  // ganttChartData = [
  //   {
  //     name: 'Market Team',
  //     color: '#EAC435',
  //     timelines: {
  //       'Market Research': [
  //         {from: new Date('June 9, 2019'), to: new Date('July 20, 2019')},
  //         {from: new Date('October 9, 2019'), to: new Date('November 20, 2019')}
  //       ],
  //       'User Documentation': [
  //         {from: new Date('August 10, 2019'), to: new Date('September 15, 2019')}
  //       ]
  //     }
  //   },
  //   {
  //     name: 'Development Team',
  //     color: '#345995',
  //     timelines: {
  //       'Software Development': [
  //         {from: new Date('July 9, 2019'), to: new Date('October 20, 2019')}
  //       ],
  //       'Testing': [
  //         {from: new Date('October 25, 2019'), to: new Date('November 15, 2019')}
  //       ],
  //       'User Documentation': [
  //         {from: new Date('August 1, 2019'), to: new Date('August 15, 2019')}
  //       ]
  //     }
  //   }
  // ];

  constructor(public beautifulChartsService: BeautifulChartsService) { }

  shortenDate(date) {
    date = date.replace('January', 'Jan');
    date = date.replace('February', 'Feb');
    date = date.replace('March', 'Mar');
    date = date.replace('April', 'Apr');
    date = date.replace('May', 'May');
    date = date.replace('June', 'Jun');
    date = date.replace('July', 'Jul');
    date = date.replace('August', 'Aug');
    date = date.replace('September', 'Sep');
    date = date.replace('October', 'Oct');
    date = date.replace('November', 'Nov');
    date = date.replace('December', 'Dec');
    return date;
  }

  computeGrid() {
    // compute the min date and max date
    // const oneDay = 24 * 60 * 60 * 1000;
    // const dateRange = Math.round(Math.abs(
    //     (this.beautifulChartsService.ganttMaxDate.getTime()
    //      - this.beautifulChartsService.ganttMinDate.getTime()
    //      ) / (oneDay)));
    let flag = 0;
    let qts = 1;

    // 3m --> 1 week  --> 12
    // 6m --> 2 weeks --> 12
    // 9m --> 3 weeks --> 12

    while (flag === 0) {
      if (this.beautifulChartsService.ganttDateRange <= 90 * qts) {
        this.gridPrecisionX = 7 * qts;
        flag = 1;
      } else qts = qts + 1;
    }

    console.log(this.gridPrecisionX);

    this.gridWidthX = this.beautifulChartsService.transformX(this.gridPrecisionX);
    this.gridWidthY = this.height / this.beautifulChartsService.ganttPhases.length;
    this.gridPath = 'M ' + this.gridWidthX + ' 0 L 0 0 0 ' + this.gridWidthY;

    this.xAxis = [];
    this.yAxis = [];

    let date = this.beautifulChartsService.ganttMinDate;
    // let xPos = this.beautifulChartsService.transformGanttDate(date) + this.xPadding + 150;
    let yTrans = this.height + this.yPadding + 10;
    // let transform = 'translate(' + xPos + 'px, ' + yTrans + 'px)';
    // this.xAxis.push({xPos: xPos, value: date, transform: transform});
    // console.log(date);
    console.log('max date: ' + this.beautifulChartsService.ganttMaxDate);
    console.log('date: ' + date);
    while (new Date(date) <= new Date(this.beautifulChartsService.ganttMaxDate)) {
      console.log('date: ' + date);
      // console.log(date);
      let xPos = this.beautifulChartsService.transformGanttDate(date) + this.xPadding + 150;
      let transform = 'translate(' + xPos + 'px, ' + yTrans + 'px)';
      this.xAxis.push({xPos: xPos, value: this.shortenDate(date), transform: transform});
      date = this.addDays(date, this.gridPrecisionX);
    }

    console.log(this.xAxis);
    let cnt = 0;
    for (const phase of this.beautifulChartsService.ganttPhases) {
      const yPos = this.gridWidthY * cnt + this.gridWidthY * 0.5 + this.yPadding;
      this.yAxis.push({yPos: yPos, value: phase });
      cnt++;
    }
  }

  ngOnInit() {
    this.computeGrid();
    this.gridID = 'grid' + this.beautifulChartsService.componentID;
  }

  ngOnChanges() {
    this.computeGrid();
  }
}
