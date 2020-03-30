import { TestBed } from '@angular/core/testing';

import { AlgoliaFishingLicenseService } from './algolia-fishing-license.service';

describe('AlgoliaFishingLicenseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlgoliaFishingLicenseService = TestBed.get(AlgoliaFishingLicenseService);
    expect(service).toBeTruthy();
  });
});
