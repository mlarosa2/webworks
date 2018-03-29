import { TestBed, inject } from '@angular/core/testing';

import { MonacoService } from './monaco.service';

describe('MonacoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonacoService]
    });
  });

  it('should be created', inject([MonacoService], (service: MonacoService) => {
    expect(service).toBeTruthy();
  }));
});
