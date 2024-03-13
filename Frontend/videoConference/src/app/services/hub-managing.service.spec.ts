import { TestBed } from '@angular/core/testing';

import { HubManagingService } from './hub-managing.service';

describe('HubManagingService', () => {
  let service: HubManagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubManagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
