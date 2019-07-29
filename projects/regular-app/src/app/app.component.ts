import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgxBeautifulCharts';

  customColorScheme = [
    '#DFD6A7', '#D4AFCD', '#F7CE5B', '#AC9969', '#A1D2CE',
    '#78CAD2', '#62A8AC', '#5497A7', '#50858B', '#2E6171'
  ];

  data = [
    {x: 10, y: 10, info: 'Point 1'},
    {x: 80, y: 40, info: 'Point 2'},
    {x: 30, y: 30, info: 'Point 3'},
    {x: 40, y: 20, info: 'Point 4'},
    {x: 40, y: 30, info: 'Point 5'},
    {x: 40, y: 40, info: 'Point 6'},
    {x: 50, y: 20, info: 'Point 7'},
    {x: 90, y: 20, info: 'Point 8'},
    {x: 41, y: 45, info: 'Point 9'},
    {x: 51, y: 22, info: 'Point 10'},
    {x: 92, y: 10, info: 'Point 11'}
  ];

  multiLineData = [
    {name: 'first', color: '#ff1111', data: [
      {x: 10, y: 10, info: 'Point 1'},
      {x: 80, y: 40, info: 'Point 2'},
      {x: 30, y: 30, info: 'Point 3'},
      {x: 40, y: 20, info: 'Point 4'},
      {x: 40, y: 30, info: 'Point 5'},
      {x: 40, y: 40, info: 'Point 6'},
      {x: 50, y: 20, info: 'Point 7'},
      {x: 90, y: 20, info: 'Point 8'},
      {x: 41, y: 45, info: 'Point 9'},
      {x: 51, y: 22, info: 'Point 10'},
      {x: 92, y: 10, info: 'Point 11'}
    ]},
    {name: 'second', color: '#33bb33', data: [
      {x: 10, y: 5, info:  ''},
      {x: 80, y: 30, info: ''},
      {x: 30, y: 25, info: ''},
      {x: 40, y: 35, info: ''},
      {x: 45, y: 25, info: ''},
      {x: 55, y: 35, info: ''},
      {x: 50, y: 15, info: ''},
      {x: 90, y: 15, info: ''},
      {x: 92, y: 5, info:  ''}
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

  multiLineData2 = [
    {name: 'first', color: '#ff1111', data: [
      {x: 10, y: 10, info: 'Point 1'},
      {x: 80, y: 40, info: 'Point 2'},
      {x: 30, y: 30, info: 'Point 3'},
      {x: 40, y: 20, info: 'Point 4'},
      {x: 40, y: 30, info: 'Point 5'}
    ]},
    {name: 'second', color: '#33bb33', data: [
      {x: 10, y: 5, info:  ''},
      {x: 80, y: 30, info: ''},
      {x: 30, y: 25, info: ''},
      {x: 40, y: 35, info: ''},
      {x: 45, y: 25, info: ''}
    ]},
    {name: 'third', color: '#3333bb', data: [
      {x: 5, y: 5, info: ''},
      {x: 15, y: 30, info: ''},
      {x: 25, y: 25, info: ''},
      {x: 35, y: 15, info: ''},
      {x: 45, y: 15, info: ''}
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
          name: 'Madras',
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
          name: 'Madras',
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
          name: 'Madras',
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


  clusteredBarChartData2 = [
    {
      series: '2010',
      color: '#EAC435',
      data: [
        {
          name: 'Calcutta',
          value: 120
        },
        {
          name: 'Bombay',
          value: 100
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
          name: 'Bombay',
          value: 120
        }
      ]
    }
  ];

  pieChartData = [
    {
      name: 'Calcutta',
      value: 20
    },
    {
      name: 'Madras',
      value: 50
    },
    {
      name: 'Bombay',
      value: 50
    },
    {
      name: 'Delhi',
      value: 10
    },
    {
      name: 'Bangalore',
      value: 50
    }
  ];

  sunburstChartData = [
    {
      name: 'Calcutta',
      children: [
        { name: 'Gariahat', value: 120 },
        { name: 'Salt Lake', children: [
          { name: 'Sector 1', value: 50 },
          { name: 'Sector 2', value: 60 },
          { name: 'Sector 3', value: 20 }
        ]},
        { name: 'Tollygunge', value: 60 }
      ],
      color: '#EAC435'
    },
    {
      name: 'Madras',
      children: [
        { name: 'Adyar', value: 120 },
        { name: 'Anna Nagar', children: [
          { name: 'Sector 1', value: 50 },
          { name: 'Sector 2', value: 60 },
          { name: 'Sector 3', value: 20 }
        ]},
        { name: 'T Nagar', value: 60 }
      ],
      color: '#345995'
    },
    {
      name: 'Bombay',
      children: [
        { name: 'Andheri', value: 120 },
        { name: 'Bandra', children: [
          { name: 'West', value: 50 },
          { name: 'East', value: 60 }
        ]},
        { name: 'Colaba', value: 60 }
      ],
      color: '#03CEA4'
    },
    {
      name: 'Delhi',
      color: '#FF6B6B',
      value: 150
    },
    {
      name: 'Bangalore',
      children: [
        { name: 'Koramangala', value: 120 },
        { name: 'Indira Nagar', children: [
          { name: 'Sector 1', value: 50 },
          { name: 'Sector 2', value: 60 },
          { name: 'Sector 3', value: 20 }
        ]},
        { name: 'Marathahalli', value: 60 }
      ],
      color: '#CA1551'
    }
  ];

  sunburstChartData2 = [
    {
      name: 'Calcutta',
      children: [
        { name: 'Gariahat', value: 120 },
        { name: 'Salt Lake', children: [
          { name: 'Sector 1', value: 50 },
          { name: 'Sector 2', value: 60 },
          { name: 'Sector 3', value: 20 }
        ]},
        { name: 'Tollygunge', value: 60 }
      ]
    },
    {
      name: 'Madras',
      children: [
        { name: 'Adyar', value: 120 },
        { name: 'Anna Nagar', children: [
          { name: 'Sector 1', value: 50 },
          { name: 'Sector 2', value: 60 },
          { name: 'Sector 3', value: 20 }
        ]},
        { name: 'T Nagar', value: 60 }
      ]
    },
    {
      name: 'Bombay',
      children: [
        { name: 'Andheri', value: 120 },
        { name: 'Bandra', children: [
          { name: 'West', value: 50 },
          { name: 'East', value: 60 }
        ]},
        { name: 'Colaba', value: 60 }
      ]
    },
    {
      name: 'Delhi',
      value: 150
    },
    {
      name: 'Bangalore',
      children: [
        { name: 'Koramangala', value: 120 },
        { name: 'Indira Nagar', children: [
          { name: 'Sector 1', value: 50 },
          { name: 'Sector 2', value: 60 },
          { name: 'Sector 3', value: 20 }
        ]},
        { name: 'Marathahalli', value: 60 }
      ]
    }
  ];

  bulletChartData = {
    target: { name: 'Target Score', value: 65},
    actual: { name: 'Actual Score', value: 48 },
    valueBands: [
      {
        from: 0,
        to: 20,
        color: '#EAC435'
      },
      {
        from: 20,
        to: 40,
        color: '#345995'
      },
      {
        from: 40,
        to: 60,
        color: '#03CEA4'
      },
      {
        from: 60,
        to: 80,
        color: '#CA1551'
      },
      {
        from: 80,
        to: 100,
        color: '#FF6B6B'
      }
    ]
  };

  ganttChartData = [
    {
      name: 'Market Team',
      color: '#EAC435',
      timelines: {
        'Market Research': [
          {from: 'June 9, 2019', to: 'July 20, 2019', info: 'wtv'},
          {from: 'October 9, 2019', to: 'November 20, 2019', info: 'wtv'}
        ],
        'User Documentation': [
          {from: 'August 10, 2019', to: 'September 15, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Development Team',
      color: '#345995',
      timelines: {
        'Software Development': [
          {from: 'July 9, 2019', to: 'October 20, 2019', info: 'wtv'}
        ],
        Testing: [
          {from: 'October 25, 2019', to: 'November 15, 2019', info: 'wtv'}
        ],
        'User Documentation': [
          {from: 'August 1, 2019', to: 'August 15, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Test Team A',
      color: '#CA1551',
      timelines: {
        Testing: [
          {from: 'August 1, 2019', to: 'August 15, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Test Team B',
      color: '#FF6B6B',
      timelines: {
        Testing: [
          {from: 'August 15, 2019', to: 'August 30, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Sales Team',
      color: '#03CEA4',
      timelines: {
        Pitching: [
          {from: 'July 9, 2019', to: 'October 20, 2019', info: 'wtv'}
        ],
        Sales: [
          {from: 'October 25, 2019', to: 'November 15, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Planning Team',
      color: '#03CEA4',
      timelines: {
        Planning: [
          {from: 'May 9, 2019', to: 'May 30, 2019', info: 'wtv'}
        ]
      }
    }
  ];


  ganttChartData2 = [
    {
      name: 'Market Team',
      timelines: {
        'Market Research': [
          {from: 'June 9, 2019', to: 'July 20, 2019', info: 'wtv'},
          {from: 'October 9, 2019', to: 'November 20, 2019', info: 'wtv'}
        ],
        'User Documentation': [
          {from: 'August 10, 2019', to: 'September 15, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Development Team',
      timelines: {
        'Software Development': [
          {from: 'July 9, 2019', to: 'October 20, 2019', info: 'wtv'}
        ],
        Testing: [
          {from: 'October 25, 2019', to: 'November 15, 2019', info: 'wtv'}
        ],
        'User Documentation': [
          {from: 'August 1, 2019', to: 'August 15, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Test Team A',
      timelines: {
        Testing: [
          {from: 'August 1, 2019', to: 'August 15, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Test Team B',
      timelines: {
        Testing: [
          {from: 'August 15, 2019', to: 'August 30, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Sales Team',
      timelines: {
        Pitching: [
          {from: 'July 9, 2019', to: 'October 20, 2019', info: 'wtv'}
        ],
        Sales: [
          {from: 'October 25, 2019', to: 'November 15, 2019', info: 'wtv'}
        ]
      }
    },
    {
      name: 'Planning Team',
      timelines: {
        Planning: [
          {from: 'May 9, 2019', to: 'May 30, 2019', info: 'wtv'}
        ]
      }
    }
  ];

  timelineChartData = [
    { time: 2010,
      color: '#EAC435',
      text: 'This is what happened in 2010'
    }, { time: 2012,
      color: '#345995',
      text: 'This is what happened in 2012'
    }, { time: 2014,
      color: '#03CEA4',
      text: 'This is what happened in 2014'
    }, { time: 2016,
      color: '#FF6B6B',
      text: 'This is what happened in 2016'
    }, { time: 2018,
      color: '#CA1551',
      text: 'This is what happened in 2018'
    }, { time: 2020,
      color: '#FFE19C',
      text: 'This is what happened in 2020'
    }
  ];

  timelineChartData2 = [
    { time: 1,
      displayTime: 'January',
      color: '#EAC435',
      text: 'This is what happened in 2010'
    }, { time: 3,
      displayTime: 'March',
      color: '#345995',
      text: 'This is what happened in 2012'
    }, { time: 6,
      displayTime: 'June',
      color: '#03CEA4',
      text: 'This is what happened in 2014'
    }, { time: 7,
      displayTime: 'July',
      color: '#FF6B6B',
      text: 'This is what happened in 2016'
    }, { time: 8,
      displayTime: 'August',
      color: '#CA1551',
      text: 'This is what happened in 2018'
    }, { time: 12,
      displayTime: 'December',
      color: '#FFE19C',
      text: 'This is what happened in 2020'
    }
  ];

  timelineChartData3 = [
    { time: 1,
      displayTime: 'January',
      text: 'This is what happened in January'
    }, { time: 2,
      displayTime: 'February',
      text: 'This is what happened in February'
    }, { time: 3,
      displayTime: 'March',
      text: 'This is what happened in March'
    }, { time: 4,
      displayTime: 'April',
      text: 'This is what happened in April'
    }, { time: 5,
      displayTime: 'May',
      text: 'This is what happened in May'
    }, { time: 6,
      displayTime: 'June',
      text: 'This is what happened in June'
    }, { time: 7,
      displayTime: 'July',
      text: 'This is what happened in July'
    }, { time: 8,
      displayTime: 'August',
      text: 'This is what happened in August'
    }, { time: 9,
      displayTime: 'September',
      text: 'This is what happened in September'
    }, { time: 10,
      displayTime: 'October',
      text: 'This is what happened in October'
    }, { time: 11,
      displayTime: 'November',
      text: 'This is what happened in November'
    }, { time: 12,
      displayTime: 'December',
      text: 'This is what happened in December'
    }
  ];
}
