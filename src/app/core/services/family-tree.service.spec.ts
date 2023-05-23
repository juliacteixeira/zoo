import { TestBed } from '@angular/core/testing';

import { FamilyTreeService } from './family-tree.service';

describe('FamilyTreeService', () => {
  let service: FamilyTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
