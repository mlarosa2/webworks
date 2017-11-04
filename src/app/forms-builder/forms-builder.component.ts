import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';
import { Form } from '../form';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
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

  private fieldToUpdate: number = -1;

  constructor(private formsService: FormsService) { }
  
  ngOnInit() {
  }
  
  addField(): void {
    this.fields.push(this.addFieldModel);
    this.addFieldModel.name = '';
    this.addFieldModel.type = '';
    this.addFieldModel.options = {
      placeholder: '',
      userOptions: ['']
    };
  }

  deleteField(fieldToDelete: string): void {
    this.fields = this.fields.filter(field => {
      field['name'] !== fieldToDelete;
    });
  }

  updateField(index: number): void {
    this.fieldToUpdate = index;
  }

  confirmUpdate(updatedName: string, updatedType: string, updatedOptions: object, index: number): void {
    this.fields[index]['name'] = updatedName;
    this.fields[index]['type'] = updatedType;
    this.fields[index]['options'] = updatedOptions;
    this.fieldToUpdate = -1;
  }

  addUserOption(): void {
    this.addFieldModel.userOptions.push('');
  }

  onSubmit():void {
    this.model.fields = this.fields;
    this.formsService.saveForm(this.model);
  }
}
