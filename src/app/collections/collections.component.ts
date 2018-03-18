import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { CollectionItemService } from '../collection-item.service';
import { DeleteConfirmationOverlayService } from '../delete-confirmation-overlay.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: [
    '../css/item-menu.css',
    './collections.component.css'
  ],
  providers: [
    CollectionItemService
  ]
})
export class CollectionsComponent implements OnInit {
  private selectedTitle: string;
  constructor(private collectionsService: CollectionsService,
              private collectionItemService: CollectionItemService,
              private deleteConfirmationOverlayService: DeleteConfirmationOverlayService) { }

  ngOnInit() {}

  isCollectionView(): boolean {
    return this.collectionsService.isCollectionView();
  }

  isBuildView(): boolean {
    return this.collectionsService.isBuildView();
  }

  isUpdateView(): boolean {
    return this.collectionsService.isUpdateView();
  }

  isItemView(): boolean {
    return this.collectionsService.isItemView();
  }

  getSelectedCollectionTitle(): string {
    return this.collectionsService.getSelectedCollection().title;
  }
  
  getTitles(): string[] {
    return this.collectionsService.getTitles();
  }

  goToCollection(title: string, event: any): void {
    event.stopPropagation();
    this.collectionsService.selectCollection(title);
    this.selectedTitle = title;
  }

  goToCollectionItems(title: string): void {
    this.selectedTitle = title;
    this.collectionsService.selectCollectionItems(title);
    this.collectionItemService.setCurrentCollection(title);
    this.collectionItemService.loadCollectionItems();
    this.collectionItemService.setListView();
    this.collectionItemService.setTemplate(title);
  }

  collectionSelected(): boolean {
    return this.collectionsService.isCollectionSelected();
  }

  deleteCollection(title: string, event: any): void {
    event.stopPropagation();
    const args = [
      {
        fn: this.collectionsService.deleteCollection.bind(this.collectionsService),
        args: [title]
      }
    ];

    this.deleteConfirmationOverlayService.checkDelete(args, title);
  }
}