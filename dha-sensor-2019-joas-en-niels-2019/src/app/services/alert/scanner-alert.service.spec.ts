import { TestBed } from '@angular/core/testing';

import { ScannerAlertService } from './scanner-alert.service';

describe('ScannerAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScannerAlertService = TestBed.get(ScannerAlertService);
    expect(service).toBeTruthy();
  });
});
