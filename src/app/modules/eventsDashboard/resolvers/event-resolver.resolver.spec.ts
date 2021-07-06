import { TestBed } from '@angular/core/testing';

import { EventResolverResolver } from './event-resolver.resolver';

describe('EventResolverResolver', () => {
  let resolver: EventResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EventResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
