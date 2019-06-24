import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteredBarChartComponent } from './clustered-bar-chart.component';

describe('ClusteredBarChartComponent', () => {
  let component: ClusteredBarChartComponent;
  let fixture: ComponentFixture<ClusteredBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusteredBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteredBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
