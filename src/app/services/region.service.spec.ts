import { TestBed } from '@angular/core/testing';
import { regionService } from './region.service';


describe('regionService', () => {
  let service: regionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(regionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
