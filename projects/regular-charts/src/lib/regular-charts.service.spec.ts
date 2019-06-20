import { TestBed } from '@angular/core/testing';

import { RegularChartsService } from './regular-charts.service';

describe('RegularChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegularChartsService = TestBed.get(RegularChartsService);
    expect(service).toBeTruthy();
  });
});
