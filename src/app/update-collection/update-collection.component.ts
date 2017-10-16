import { Component, OnChanges, Input } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  styleUrls: ['./update-collection.component.css']
})
export class UpdateCollectionComponent implements OnChanges {
  @Input() title: string;
  private model: Collection = new Collection('', []);
  private fields: string[];
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
        this.model.fields  = JSON.parse(collection._body).fields;
        this.originalTitle = title;
        this.fields        = JSON.parse(collection._body).fields
      });
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

  onSubmit():void {
    this.model.fields = this.fields;
    this.collectionsService.updateCollectionRecord(this.originalTitle, this.model.fields, this.model.title);
  }

}
