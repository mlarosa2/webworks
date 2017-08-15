import { Injectable } from '@angular/core';
import { PageService } from './page.service';
import { MediaService } from './media.service';
import { CollectionsService } from './collections.service';

@Injectable()
export class AdminService {
  private currentView: string = 'home';
  private views: string[] = ['Media', 'Pages', 'Collections', 'Forms'];
    constructor(private pageService: PageService,
                private mediaService: MediaService,
                private collectionsService: CollectionsService) { }

  getCurrentView(): string {
    return this.currentView;
  }

  setCurrentView(view: string): void  {
    this.currentView = view;
    if (view === 'pages') {
      this.pageService.setPageHome();
    } else if (view === 'media') {
      this.mediaService.setFiles();
    } else if (view === 'collections') {
      this.collectionsService.setCollectionView();
    }
  }

  getViews(): string[] {
    return this.views;
  }
}
