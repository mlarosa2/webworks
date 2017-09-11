import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-update-collection',
  templateUrl: './update-collection.component.html',
  styleUrls: ['./update-collection.component.css']
})
export class UpdateCollectionComponent implements OnInit {
  private model: Collection = this.collectionsService.getSelectedCollection();
  private fields: string[] = this.model.fields;
  private addFieldModel: any = {
    name: ''
  };

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

  onSubmit():void {
    this.model.fields = this.fields;
    this.collectionsService.updateCollectionRecord(this.model.title, this.model.fields);
  }

}
