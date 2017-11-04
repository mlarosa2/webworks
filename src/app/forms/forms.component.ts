import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';
import { Form } from '../form';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  private selectedTitle: string;
  constructor(private formsService: FormsService) { }

  ngOnInit() {}

  isFormView(): boolean {
    return this.formsService.isFormView();
  }

  isBuildView(): boolean {
    return this.formsService.isBuildView();
  }

  isUpdateView(): boolean {
    return this.formsService.isUpdateView();
  }

  getSelectedFormTitle(): string {
    return this.formsService.getSelectedForm().title;
  }
  
  getTitles(): string[] {
    return this.formsService.getTitles();
  }

  goToForm(title: string): void {
    this.formsService.selectForm(title);
    this.selectedTitle = title;
  }

  formSelected(): boolean {
    return this.formsService.isFormSelected();
  }

  deleteForm(title: string): void {
    this.formsService.deleteForm(title);
  }
}