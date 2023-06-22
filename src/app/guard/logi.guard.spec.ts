import { TestBed } from '@angular/core/testing';

import { LogiGuard } from './logi.guard';

describe('LogiGuard', () => {
  let guard: LogiGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogiGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
