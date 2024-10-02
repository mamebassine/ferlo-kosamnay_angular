import { TestBed } from '@angular/core/testing';

import { RepresentantService } from './representant.service';

describe('RepresentantService', () => {
  let service: RepresentantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepresentantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
