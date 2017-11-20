import { Component, OnInit } from '@angular/core';
import { CollectionItemService } from '../collection-item.service';

@Component({
  selector: 'app-collection-item-builder',
  templateUrl: './collection-item-builder.component.html',
  styleUrls: ['./collection-item-builder.component.css']
})
export class CollectionItemBuilderComponent implements OnInit {
  private template: string[];
  private fieldModel: any = {};

  constructor(private collectionItemService: CollectionItemService) { }
  ngOnInit() {
  }

  getTemplate(): string[] {
    if (!this.template) {
      this.template = this.collectionItemService.getTemplate();
    }

    return this.template;
  }
}
