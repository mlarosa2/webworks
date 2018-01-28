import { TestBed, inject } from '@angular/core/testing';

import { PageParserService } from './page-parser.service';

describe('PageParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageParserService]
    });
  });

  it('should be created', inject([PageParserService], (service: PageParserService) => {
    expect(service).toBeTruthy();
  }));
});
