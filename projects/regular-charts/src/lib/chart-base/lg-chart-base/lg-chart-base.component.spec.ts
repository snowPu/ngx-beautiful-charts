import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgChartBaseComponent } from './lg-chart-base.component';

describe('LgChartBaseComponent', () => {
  let component: LgChartBaseComponent;
  let fixture: ComponentFixture<LgChartBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgChartBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
