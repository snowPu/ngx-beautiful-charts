import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcChartBaseComponent } from './gc-chart-base.component';

describe('GcChartBaseComponent', () => {
  let component: GcChartBaseComponent;
  let fixture: ComponentFixture<GcChartBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcChartBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
