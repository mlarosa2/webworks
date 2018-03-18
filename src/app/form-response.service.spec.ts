import { TestBed, inject } from '@angular/core/testing';

import { FormResponseService } from './form-response.service';

describe('FormResponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormResponseService]
    });
  });

  it('should be created', inject([FormResponseService], (service: FormResponseService) => {
    expect(service).toBeTruthy();
  }));
});
