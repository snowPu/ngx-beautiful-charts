import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
    {x: 90, y: 20, info: ''}
  ];
}
