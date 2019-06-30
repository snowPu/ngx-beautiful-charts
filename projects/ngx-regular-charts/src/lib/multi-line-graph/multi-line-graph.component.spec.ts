import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLineGraphComponent } from './multi-line-graph.component';

describe('MultiLineGraphComponent', () => {
  let component: MultiLineGraphComponent;
  let fixture: ComponentFixture<MultiLineGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLineGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
