import { TestBed, inject } from '@angular/core/testing';

import { GlobalAssetsService } from './global-assets.service';

describe('GlobalAssetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalAssetsService]
    });
  });

  it('should be created', inject([GlobalAssetsService], (service: GlobalAssetsService) => {
    expect(service).toBeTruthy();
  }));
});
