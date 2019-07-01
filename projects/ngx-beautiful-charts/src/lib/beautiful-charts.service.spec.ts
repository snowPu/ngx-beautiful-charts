import { TestBed } from '@angular/core/testing';

import { BeautifulChartsService } from './beautiful-charts.service';

describe('BeautifulChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeautifulChartsService = TestBed.get(BeautifulChartsService);
    expect(service).toBeTruthy();
  });
});
