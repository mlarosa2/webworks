import { Component, OnChanges, Input } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  styleUrls: [
    '../css/forms.css',
    './update-collection.component.css'
  ]
})
export class UpdateCollectionComponent implements OnChanges {
  @Input() title: string;
  public fields: string[] = [];
  private model: Collection = new Collection('', []);
  private originalTitle: string;
  private addFieldModel: any = {
    name: ''
  };

  private fieldToUpdate: number = -1;

  constructor(private collectionsService: CollectionsService) { }
  
  ngOnChanges() {
    const title = this.title;
    this.collectionsService.getCollection(title)
      .then(collection => {
        this.model.title   = title;
        this.model.fields  = collection.json().fields;
        this.originalTitle = title;
        this.fields        = collection.json().fields
      });
  }
  
  addField(): void {
    this.fields.push(this.addFieldModel.name);
    this.addFieldModel.name = '';
  }

  deleteField(fieldToDelete: string): void {
    this.fields = this.fields.filter(field => field !== fieldToDelete);
  }

  updateField(index: number): void {
    this.fieldToUpdate = index;
  }

  confirmUpdate(updatedName: string, index: number): void {
    this.fields[index] = updatedName;
    this.fieldToUpdate = -1;
  }

  onSubmit():void {
    this.model.fields = this.fields;
    this.collectionsService.updateCollectionRecord(this.originalTitle, this.model.fields, this.model.title);
  }

}
