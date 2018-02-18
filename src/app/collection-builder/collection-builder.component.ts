import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-collection-builder',
  templateUrl: './collection-builder.component.html',
  styleUrls: [
    '../css/forms.css',
    './collection-builder.component.css'
  ]
})
export class CollectionBuilderComponent implements OnInit {
  private fields: string[] = [];
  private addFieldModel: any = {
    name: ''
  };
  private model: Collection = new Collection ('', this.fields);

  private fieldToUpdate: number = -1;

  constructor(private collectionsService: CollectionsService) { }
  
  ngOnInit() {
  }
  
  addField(): void {
    this.fields.push(this.addFieldModel.name);
    this.addFieldModel.name = '';
  }

  deleteField(fieldToDelete: string): void {
    this.fields = this.fields.filter(field => {
      field !== fieldToDelete;
    });
  }

  updateField(index: number): void {
    this.fieldToUpdate = index;
  }

  confirmUpdate(updatedName: string, index: number): void {
    this.fields[index] = updatedName;
    this.fieldToUpdate = -1;
  }

  onSubmit(): void {
    this.model.fields = this.fields;
    this.collectionsService.saveCollection(this.model);
  }

  goBack(): void {
    this.collectionsService.setCollectionView();
  }
}
