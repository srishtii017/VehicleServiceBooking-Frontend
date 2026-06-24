import { TestBed } from '@angular/core/testing';

import { Bookingservice } from './bookingservice';

describe('Bookingservice', () => {
  let service: Bookingservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bookingservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
