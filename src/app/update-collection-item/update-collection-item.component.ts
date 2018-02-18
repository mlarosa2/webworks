import { Component, OnChanges, Input } from '@angular/core';
import { CollectionItemService } from '../collection-item.service';
import { CollectionItem } from '../collection-item';

@Component({
  selector: 'app-update-collection-item',
  templateUrl: './update-collection-item.component.html',
  styleUrls: ['./update-collection-item.component.css']
})
export class UpdateCollectionItemComponent implements OnChanges {
  @Input() belongsTo: string;
  private template: string[];
  private fieldModel: CollectionItem = new CollectionItem('', {}, '');

  constructor(private collectionItemService: CollectionItemService) { }
  ngOnChanges() {
    this.collectionItemService.getCollectionItem()
      .then(response => {
        this.fieldModel.setTitle(response.json().title);
        this.fieldModel.setFields(response.json().fields);
        this.fieldModel.setBelongsTo(this.belongsTo);
      });
  }

  getTemplate(): string[] {
    if (!this.template) {
      this.template = this.collectionItemService.getTemplate();
    }

    return this.template;
  }

  onSubmit(): void {
    this.collectionItemService.updateItem(this.fieldModel);
  }

  goBack(): void {
    this.collectionItemService.setListView();
  }
}
