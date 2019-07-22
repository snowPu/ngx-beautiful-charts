import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartBaseComponent } from './donut-chart-base.component';

describe('DonutChartBaseComponent', () => {
  let component: DonutChartBaseComponent;
  let fixture: ComponentFixture<DonutChartBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutChartBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
