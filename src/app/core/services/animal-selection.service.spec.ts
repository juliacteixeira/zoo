import { TestBed } from '@angular/core/testing';

import { AnimalSelectionService } from './animal-selection.service';

describe('AnimalSelectionService', () => {
  let service: AnimalSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
