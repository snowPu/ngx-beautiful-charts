import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'regular-app';

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
      {x: 40, y: 15, info: ''},
      {x: 40, y: 25, info: ''},
      {x: 40, y: 35, info: ''},
      {x: 50, y: 15, info: ''},
      {x: 90, y: 15, info: ''},
      {x: 41, y: 35, info: ''},
      {x: 51, y: 12, info: ''},
      {x: 92, y: 5, info: ''}
    ]},
  ];
}
