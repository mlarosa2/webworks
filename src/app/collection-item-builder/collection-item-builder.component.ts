import { Component, OnInit, Input } from '@angular/core';
import { CollectionItemService } from '../collection-item.service';
import { CollectionItem } from '../collection-item';

@Component({
  selector: 'app-collection-item-builder',
  templateUrl: './collection-item-builder.component.html',
  styleUrls: ['./collection-item-builder.component.css']
})
export class CollectionItemBuilderComponent implements OnInit {
  @Input() belongsTo: string;
  private template: string[];
  private fieldModel: CollectionItem = new CollectionItem('', {}, '');

  constructor(private collectionItemService: CollectionItemService) { }
  ngOnInit() { }

  getTemplate(): string[] {
    if (!this.template) {
      this.template = this.collectionItemService.getTemplate();
    }

    return this.template;
  }

  addCollectionItem(): void {
    this.fieldModel.setBelongsTo(this.belongsTo); // not sure why I don't have this.belongs to when I instantiate class
    this.collectionItemService.addItem(this.fieldModel);
  }
}
