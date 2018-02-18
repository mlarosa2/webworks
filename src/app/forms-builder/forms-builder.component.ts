import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';
import { Form } from '../form';

@Component({
  selector: 'app-form-builder',
  templateUrl: './forms-builder.component.html',
  styleUrls: [
    '../css/forms.css',
    './forms-builder.component.css'
  ]
})
export class FormsBuilderComponent implements OnInit {
  private fields: object[] = [];
  private addFieldModel: any = {
    name: '',
    type: '',
    options: {
      placeholder: '',
      userOptions: ['']
    }
  };
  private model: Form = new Form ('', this.fields);
  private editFieldModel: any;
  private fieldToUpdate: number = -1;

  constructor(private formsService: FormsService) { }
  
  ngOnInit() {
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
    this.addFieldModel.options.userOptions.push('');
  }

  addEditUserOption(): void {
    this.editFieldModel.options.userOptions.push('');
  }

  //prevents losing focus when typing in user options input
  trackByFn(index: any, item: any): any {
    return index;
  }

  onSubmit(): void {
    this.model.fields = this.fields;
    this.formsService.saveForm(this.model);
  }

  goBack(): void {
    this.formsService.setFormView();
  }
}
