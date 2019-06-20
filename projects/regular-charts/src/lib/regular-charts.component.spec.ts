import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularChartsComponent } from './regular-charts.component';

describe('RegularChartsComponent', () => {
  let component: RegularChartsComponent;
  let fixture: ComponentFixture<RegularChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
