import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {
  private currentView: String = 'home';
  private views: String[] = ['Media', 'Pages', 'Collections', 'Forms'];
  constructor() { }

  getCurrentView(): String {
    return this.currentView;
  }

  setCurrentView(view: String): void  {
    this.currentView = view;
  }

  getViews(): String[] {
    return this.views;
  }
}
