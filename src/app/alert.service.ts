import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private showBanner = new Subject<{message: string, state: string}>();
  showBanner$ = this.showBanner.asObservable();

  constructor() { }

  success(message: string): void {
    this.showBanner.next({message: message, state: 'success'});
  }

  error(message: string): void {
    this.showBanner.next({message: message, state: 'error'});
  }
}
