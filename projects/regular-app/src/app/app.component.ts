import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Regular Charts';

  data = [
    {x: 10, y: 10, info: ''},
    {x: 80, y: 40, info: ''},
    {x: 30, y: 30, info: ''},
    {x: 40, y: 20, info: ''},
    {x: 40, y: 30, info: ''},
    {x: 40, y: 40, info: ''},
    {x: 50, y: 20, info: ''},
    {x: 90, y: 20, info: ''},
    {x: 41, y: 45, info: ''},
    {x: 51, y: 22, info: ''},
    {x: 92, y: 10, info: ''}
  ];

  multiLineData = [
    {name: 'first', color: '#ff1111', data: [
      {x: 10, y: 10, info: ''},
      {x: 80, y: 40, info: ''},
      {x: 30, y: 30, info: ''},
      {x: 40, y: 20, info: ''},
      {x: 40, y: 30, info: ''},
      {x: 40, y: 40, info: ''},
      {x: 50, y: 20, info: ''},
      {x: 90, y: 20, info: ''},
      {x: 41, y: 45, info: ''},
      {x: 51, y: 22, info: ''},
      {x: 92, y: 10, info: ''}
    ]},
    {name: 'second', color: '#33bb33', data: [
      {x: 10, y: 5, info: ''},
      {x: 80, y: 30, info: ''},
      {x: 30, y: 25, info: ''},
      {x: 40, y: 35, info: ''},
      {x: 45, y: 25, info: ''},
      {x: 55, y: 35, info: ''},
      {x: 50, y: 15, info: ''},
      {x: 90, y: 15, info: ''},
      {x: 92, y: 5, info: ''}
    ]},
    {name: 'third', color: '#3333bb', data: [
      {x: 5, y: 5, info: ''},
      {x: 15, y: 30, info: ''},
      {x: 25, y: 25, info: ''},
      {x: 35, y: 15, info: ''},
      {x: 45, y: 15, info: ''},
      {x: 55, y: 35, info: ''},
      {x: 65, y: 25, info: ''},
      {x: 75, y: 5, info: ''}
    ]},
    {name: 'fourth', color: '#10ffbb', data: [
      {x: 15, y: 5, info: ''},
      {x: 5, y: 30, info: ''},
      {x: 25, y: 15, info: ''},
      {x: 30, y: 16, info: ''},
      {x: 4, y: 35, info: ''},
      {x: 65, y: 35, info: ''},
      {x: 65, y: 25, info: ''},
      {x: 85, y: 5, info: ''}
    ]}
  ];


  barChartData = [
    {
      name: 'Calcutta',
      value: 1
    },
    {
      name: 'Madras',
      value: 3
    },
    {
      name: 'Bombay',
      value: 9
    },
    {
      name: 'Delhi',
      value: 8
    }
  ];

  barChartData2 = [
    {
      name: 'Calcutta',
      value: 100
    },
    {
      name: 'Madras',
      value: 104
    },
    {
      name: 'Bombay',
      value: 105
    },
    {
      name: 'Delhi',
      value: 101
    }
  ];

  clusteredBarChartData = [
    {
      series: '2010',
      color: '#EAC435',
      data: [
        {
          name: 'Calcutta',
          value: 120
        },
        {
          name: 'Chennai',
          value: 300
        },
        {
          name: 'Bombay',
          value: 100
        },
        {
          name: 'Delhi',
          value: 400
        }
      ]
    },
    {
      series: '2020',
      color: '#345995',
      data: [
        {
          name: 'Calcutta',
          value: 220
        },
        {
          name: 'Chennai',
          value: 320
        },
        {
          name: 'Bombay',
          value: 130
        },
        {
          name: 'Delhi',
          value: 440
        }
      ]
    },
    {
      series: '2030',
      color: '#CA1551',
      data: [
        {
          name: 'Calcutta',
          value: 100
        },
        {
          name: 'Chennai',
          value: 100
        },
        {
          name: 'Bombay',
          value: 120
        },
        {
          name: 'Delhi',
          value: 140
        }
      ]
    }
  ];

  pieChartData = [
    {
      name: 'Calcutta',
      color: '#EAC435',
      value: 50
    },
    {
      name: 'Madras',
      color: '#345995',
      value: 50
    },
    {
      name: 'Bombay',
      color: '#03CEA4',
      value: 50
    },
    {
      name: 'Delhi',
      color: '#FF6B6B',
      value: 50
    },
    {
      name: 'Bangalore',
      color: '#CA1551',
      value: 50
    }
  ];
}
