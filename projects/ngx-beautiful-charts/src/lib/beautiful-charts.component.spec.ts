import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautifulChartsComponent } from './beautiful-charts.component';

describe('BeautifulChartsComponent', () => {
  let component: BeautifulChartsComponent;
  let fixture: ComponentFixture<BeautifulChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautifulChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautifulChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
