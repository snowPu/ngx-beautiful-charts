import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartBaseComponent } from './pie-chart-base.component';

describe('PieChartBaseComponent', () => {
  let component: PieChartBaseComponent;
  let fixture: ComponentFixture<PieChartBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
