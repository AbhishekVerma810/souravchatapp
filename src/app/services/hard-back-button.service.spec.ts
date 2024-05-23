import { TestBed } from '@angular/core/testing';

import { HardBackButtonService } from './hard-back-button.service';

describe('HardBackButtonService', () => {
  let service: HardBackButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardBackButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
