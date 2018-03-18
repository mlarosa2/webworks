import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';
import { DeleteConfirmationOverlayService } from '../delete-confirmation-overlay.service';
import { Form } from '../form';
import { FormResponseService } from '../form-response.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: [
    '../css/item-menu.css',
    './forms.component.css'
  ]
})
export class FormsComponent implements OnInit {
  private selectedTitle: string;
  constructor(private formsService: FormsService,
              private formResponseService: FormResponseService,
              private deleteConfirmationOverlayService: DeleteConfirmationOverlayService) { }

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

  goToFormResponses(title: string): void {
    this.selectedTitle = title;
    this.formsService.selectFormResponses(title);
    this.formResponseService.setCurrentForm(title);
    this.formResponseService.loadFormResponses();
    this.formResponseService.setListView();
  }

  isFormResponseView(): boolean {
    return this.formsService.isFormResponseView();
  }

  deleteForm(title: string): void {
    const args = [
      {
        fn: this.formsService.deleteForm.bind(this.formsService),
        args: [title]
      }
    ];

    this.deleteConfirmationOverlayService.checkDelete(args, title);
  }
}