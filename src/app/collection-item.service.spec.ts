import { TestBed, inject } from '@angular/core/testing';

import { CollectionItemService } from './collection-item.service';

describe('CollectionItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionItemService]
    });
  });

  it('should be created', inject([CollectionItemService], (service: CollectionItemService) => {
    expect(service).toBeTruthy();
  }));
});
