import { TestBed } from '@angular/core/testing';

import { SserviceService } from './sservice.service';

describe('SserviceService', () => {
  let service: SserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
