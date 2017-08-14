import { Injectable } from '@angular/core';
import { PageService } from './page.service';
import { MediaService } from './media.service';
import { CollectionsService } from './collections.service';

@Injectable()
export class AdminService {
  private currentView: String = 'home';
  private views: String[] = ['Media', 'Pages', 'Collections', 'Forms'];
    constructor(private pageService: PageService,
                private mediaService: MediaService,
                private collectionsService: CollectionsService) { }

  getCurrentView(): String {
    return this.currentView;
  }

  setCurrentView(view: String): void  {
    this.currentView = view;
    if (view === 'pages') {
      this.pageService.setPageHome();
    } else if (view === 'media') {
      this.mediaService.setFiles();
    } else if (view === 'collections') {
      this.collectionsService.setCollectionView();
    }
  }

  getViews(): String[] {
    return this.views;
  }
}
