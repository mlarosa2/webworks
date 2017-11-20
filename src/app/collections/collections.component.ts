import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { CollectionItemService } from '../collection-item.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
  providers: [
    CollectionItemService
  ]
})
export class CollectionsComponent implements OnInit {
  private selectedTitle: string;
  constructor(private collectionsService: CollectionsService,
              private collectionItemService: CollectionItemService ) { }

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

  goToCollectionItems(title: string) {
    this.collectionsService.selectCollectionItems(title);
    this.collectionItemService.loadCollectionItems(title);
    this.collectionItemService.setListView();
    this.selectedTitle = title;
  }

  collectionSelected(): boolean {
    return this.collectionsService.isCollectionSelected();
  }

  deleteCollection(title: string, event: any): void {
    event.stopPropagation();
    this.collectionsService.deleteCollection(title);
  }
}