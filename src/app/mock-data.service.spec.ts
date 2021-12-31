import { TestBed } from '@angular/core/testing';

import { MockDataService } from './mock-data.service';

describe('MockDataService', () => {
  let service: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#createDefect should return Defect object', () => {
    expect(service.createDefect(12, 34).uuid).toBe('12,34')
    expect(service.createDefect(12, 34).x).toBe(12)
    expect(service.createDefect(12, 34).y).toBe(34)
  });

  it('#createPanel should return number of defects', () => {
    expect(service.createPanel({ width: 300, height: 400 })).toBe(100);
  });
});
