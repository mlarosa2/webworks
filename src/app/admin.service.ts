import { Injectable } from '@angular/core';
import { PageService } from './page.service';
import { MediaService } from './media.service';
import { CollectionsService } from './collections.service';
import { FormsService} from './forms.service';
import { AssetService } from './asset.service';
import { TemplateService} from './template.service';

@Injectable()
export class AdminService {
  private currentView: string = 'home';
  private views: string[] = ['Media', 'Pages', 'Collections', 'Forms', 'Assets', 'Templates'];
    constructor(private pageService: PageService,
                private mediaService: MediaService,
                private collectionsService: CollectionsService,
                private formsService: FormsService,
                private assetService: AssetService,
                private templateService: TemplateService) {}

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
    } else if (view === 'assets') {
      this.assetService.setAssetHome();
    } else if (view === 'templates') {
      this.templateService.setTemplateHome();
    }
  }

  getViews(): string[] {
    return this.views;
  }
}
