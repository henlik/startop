import { TestBed } from '@angular/core/testing';

import { RevokeGuard } from './revoke.guard';

describe('RevokeGuard', () => {
  let guard: RevokeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RevokeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
