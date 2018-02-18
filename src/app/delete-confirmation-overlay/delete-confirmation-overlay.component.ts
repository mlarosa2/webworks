import { Component, OnInit } from '@angular/core';
import { DeleteConfirmationOverlayService } from '../delete-confirmation-overlay.service';

@Component({
  selector: 'app-delete-confirmation-overlay',
  templateUrl: './delete-confirmation-overlay.component.html',
  styleUrls: [
    '../css/forms.css',
    './delete-confirmation-overlay.component.css'
  ]
})
export class DeleteConfirmationOverlayComponent implements OnInit {
  constructor(private deleteConfirmationOverlayService: DeleteConfirmationOverlayService) { }

  ngOnInit() {

  }

  getThingToDelete(): string {
    return this.deleteConfirmationOverlayService.getThingToDelete();
  }

  hideOverlay(): void {
    this.deleteConfirmationOverlayService.hideOverlay();
  }

  confirmDelete(): void {
    this.deleteConfirmationOverlayService.confirmDelete();
  }
}
