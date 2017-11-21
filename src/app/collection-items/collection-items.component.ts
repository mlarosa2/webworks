import { Component, OnInit, Input } from '@angular/core';
import { CollectionItemService } from '../collection-item.service';

@Component({
  selector: 'app-collection-items',
  templateUrl: './collection-items.component.html',
  styleUrls: ['./collection-items.component.css']
})
export class CollectionItemsComponent implements OnInit {
  @Input() title: string;
  private currentCollectionItems: string[];

  constructor(private collectionItemService: CollectionItemService) { }

  ngOnInit() { }

  getCollectionItems(): string[] {
    this.currentCollectionItems = this.collectionItemService.getCollectionItems();
    return this.currentCollectionItems;
  }

  isListView(): boolean {
    return this.collectionItemService.isListView();
  }

  isBuildView(): boolean {
    return this.collectionItemService.isNewItemView();
  }

  isUpdateView(): boolean {
    return this.collectionItemService.isUpdateItemView();
  }

  newCollectionItem(): void {
    this.collectionItemService.setNewItemView();
  }

  deleteCollectionItem(title: string, $event: any): void {
    $event.stopPropagation();
  }

  goToCollectionItem(title: string, $event: any): void {
    $event.stopPropagation();
    this.collectionItemService.setupdateItemView();
  }
}
