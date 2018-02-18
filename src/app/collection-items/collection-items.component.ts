import { Component, OnInit, Input } from '@angular/core';
import { CollectionItemService } from '../collection-item.service';
import { AdminService } from '../admin.service';
import { DeleteConfirmationOverlayService } from '../delete-confirmation-overlay.service';

@Component({
  selector: 'app-collection-items',
  templateUrl: './collection-items.component.html',
  styleUrls: [
    '../css/item-menu.css',
    '../css/forms.css',
    './collection-items.component.css'
  ]
})
export class CollectionItemsComponent implements OnInit {
  @Input() title: string;
  private currentCollectionItems: string[];

  constructor(private collectionItemService: CollectionItemService,
              private adminService: AdminService,
              private deleteConfirmationOverlayService: DeleteConfirmationOverlayService) { }              

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

  deleteCollectionItem(item: string, $event: any): void {
    $event.stopPropagation();
    const args = [
      {
        fn: this.collectionItemService.deleteItem.bind(this.collectionItemService),
        args: [item]
      },
      {
        fn: this.removeItemFromUI.bind(this),
        args: [item]
      }
    ];

    this.deleteConfirmationOverlayService.checkDelete(args, item);
  }

  removeItemFromUI(item: string): void {
    this.currentCollectionItems = this.currentCollectionItems.filter(itemName => itemName !== item);
  }

  goToCollectionItem(title: string, $event: any): void {
    $event.stopPropagation();
    this.collectionItemService.setUpdateItemView(title);
  }

  goBack() {
    if (this.isListView()) {
      this.adminService.setCurrentView('collections');
    } else {
      this.collectionItemService.setListView();
    }
  }
}
