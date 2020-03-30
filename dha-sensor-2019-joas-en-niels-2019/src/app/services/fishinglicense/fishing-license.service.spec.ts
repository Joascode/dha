import { TestBed } from '@angular/core/testing';

import { FishingLicenseService } from './fishing-license.service';

describe('FishingLicenseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishingLicenseService = TestBed.get(FishingLicenseService);
    expect(service).toBeTruthy();
  });
});
