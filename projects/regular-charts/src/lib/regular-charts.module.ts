import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RegularChartsComponent } from './regular-charts.component';

@NgModule({
  declarations: [RegularChartsComponent],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [RegularChartsComponent]
})
export class RegularChartsModule { }
