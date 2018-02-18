import { Injectable } from '@angular/core';

@Injectable()
export class DeleteConfirmationOverlayService {
  private showOverlay: boolean = false;
  private autoDelete: boolean = false;
  private payload: any[] = [];
  private thingToDelete: string = '';
  constructor() { }

  viewOverlay(): boolean {
    return this.showOverlay;
  }

  checkDelete(args: any[], thingBeingDeleted: string): void {
    this.payload = args;
    this.thingToDelete = thingBeingDeleted;
    if (this.autoDelete) {
      this.confirmDelete();
    } else {
      this.showOverlay = true;
    }
  }

  confirmDelete(): void {
    this.payload.forEach(fn => {
      fn.fn(...fn.args);
    });

    this.showOverlay = false;
    this.payload = [];
    this.thingToDelete = '';
  }

  hideOverlay(): void {
    this.showOverlay = false;
    this.payload = [];
    this.thingToDelete = '';
  }

  getThingToDelete(): string {
    return this.thingToDelete;
  }
}
