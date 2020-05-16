import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BeautifulChartsModule } from '../../../ngx-beautiful-charts/src/lib/beautiful-charts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BeautifulChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
