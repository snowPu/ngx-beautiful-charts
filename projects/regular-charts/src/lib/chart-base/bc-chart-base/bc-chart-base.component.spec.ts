import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcChartBaseComponent } from './bc-chart-base.component';

describe('BcChartBaseComponent', () => {
  let component: BcChartBaseComponent;
  let fixture: ComponentFixture<BcChartBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BcChartBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
