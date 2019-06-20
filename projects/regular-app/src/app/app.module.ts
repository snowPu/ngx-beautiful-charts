import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegularChartsModule } from 'regular-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RegularChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
