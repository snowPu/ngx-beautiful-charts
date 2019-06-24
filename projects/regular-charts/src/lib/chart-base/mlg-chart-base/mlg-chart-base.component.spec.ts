import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlgChartBaseComponent } from './mlg-chart-base.component';

describe('MlgChartBaseComponent', () => {
  let component: MlgChartBaseComponent;
  let fixture: ComponentFixture<MlgChartBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlgChartBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlgChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
