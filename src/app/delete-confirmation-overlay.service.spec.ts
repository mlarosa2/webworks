import { TestBed, inject } from '@angular/core/testing';

import { DeleteConfirmationOverlayService } from './delete-confirmation-overlay.service';

describe('DeleteConfirmationOverlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteConfirmationOverlayService]
    });
  });

  it('should be created', inject([DeleteConfirmationOverlayService], (service: DeleteConfirmationOverlayService) => {
    expect(service).toBeTruthy();
  }));
});
