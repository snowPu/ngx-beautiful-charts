import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbcChartBaseComponent } from './cbc-chart-base.component';

describe('CbcChartBaseComponent', () => {
  let component: CbcChartBaseComponent;
  let fixture: ComponentFixture<CbcChartBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbcChartBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbcChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
