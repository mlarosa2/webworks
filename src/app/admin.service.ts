import { Injectable } from '@angular/core';
import { PageService } from './page.service';
import { MediaService } from './media.service';
import { CollectionsService } from './collections.service';
import { FormsService} from './forms.service';
import { AssetService } from './asset.service';

@Injectable()
export class AdminService {
  private currentView: string = 'home';
  private views: string[] = ['Media', 'Pages', 'Collections', 'Forms', 'Assets'];
    constructor(private pageService: PageService,
                private mediaService: MediaService,
                private collectionsService: CollectionsService,
                private formsService: FormsService,
                private assetService: AssetService) { }

  getCurrentView(): string {
    return this.currentView;
  }

  setCurrentView(view: string): void  {
    this.currentView = view;[]
    if (view === 'pages') {
      this.pageService.setPageHome();
    } else if (view === 'media') {
      this.mediaService.setFiles();
    } else if (view === 'collections') {
      this.collectionsService.setCollectionView();
    } else if (view === 'forms') {
      this.formsService.setFormView();
    } else if (view === 'asset') {
      this.assetService.setAssetHome();
    }
  }

  getViews(): string[] {
    return this.views;
  }
}
