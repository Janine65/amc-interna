import { TestBed } from '@angular/core/testing';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = TestBed.runInInjectionContext(() => new SafePipe());
    expect(pipe).toBeTruthy();
  });
});
