import { Component, OnChanges, Input } from '@angular/core';
import { FormsService } from '../forms.service';
import { Form } from '../form';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: [
    '../css/forms.css',
    './update-form.component.css'
  ]
})
export class UpdateFormComponent implements OnChanges {
  @Input() title: string;
  private fields: object[] = [];
  private model: Form = new Form ('', []);
  private originalTitle: string;
  private addFieldModel: any = {
    name: '',
    type: '',
    options: {
      placeholder: '',
      userOptions: ['']
    }
  };
  private editFieldModel: any;
  private fieldToUpdate: number = -1;

  constructor(private formsService: FormsService) { }
  
  ngOnChanges() {
    const title = this.title;
    this.formsService.getForm(title)
      .then(form => {
        this.model.title   = title;
        this.model.fields  = JSON.parse(form._body).fields;
        this.originalTitle = title;
        this.fields        = JSON.parse(form._body).fields
      });  
  }
  
  addField(): void {
    this.addFieldModel.options.userOptions = this.addFieldModel.options.userOptions.filter(opt => opt);
    this.fields.push(this.addFieldModel);
    this.addFieldModel = {
      name: '',
      type: '',
      options: {
        placeholder: '',
        userOptions: ['']
      }
    };
  }

  deleteField(fieldToDelete: string): void {
    this.fields = this.fields.filter(field => {
      field['name'] !== fieldToDelete;
    });
  }

  updateField(index: number): void {
    this.fieldToUpdate = index;
    this.editFieldModel = JSON.parse(JSON.stringify(this.fields[index]));
    if (this.editFieldModel.options.userOptions.length === 0) {
      this.editFieldModel.options.push('');
    }
  }

  confirmUpdate(index: number): void {
    this.fields[index] = JSON.parse(JSON.stringify(this.editFieldModel));
    this.editFieldModel = {};
    this.fieldToUpdate = -1;
  }

  addUserOption(): void {
    this.addFieldModel.userOptions.push('');
  }

   addEditUserOption(): void {
    this.editFieldModel.options.userOptions.push('');
  }

  //prevents losing focus when typing in user options input
  trackByFn(index: any, item: any): any {
    return index;
  }

  onSubmit():void {
    this.model.fields = this.fields;
    this.formsService.updateFormRecord(this.originalTitle, this.model.fields, this.model.title);
  }
}
