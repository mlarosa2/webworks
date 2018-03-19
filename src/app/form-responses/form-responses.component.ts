import { Component, OnInit, Input } from '@angular/core';
import { FormResponseService } from '../form-response.service';
import { AdminService } from '../admin.service';
import { DeleteConfirmationOverlayService } from '../delete-confirmation-overlay.service';

@Component({
  selector: 'app-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: [
    '../css/item-menu.css',
    '../css/forms.css',
    './form-responses.component.css'
  ]
})
export class FormResponsesComponent implements OnInit {
  private currentFormResponses: any[];
  @Input() belongsTo: string;
  constructor(private formResponseService: FormResponseService,      
              private adminService: AdminService,
              private deleteConfirmationOverlayService: DeleteConfirmationOverlayService) { }
  
  ngOnInit() { }

  getFormResponses(): any[] {
    this.currentFormResponses = this.formResponseService.getFormResponses();

    return this.currentFormResponses;
  }

  isListView(): boolean {
    return this.formResponseService.isListView();
  }

  isExploreView(): boolean {
    return this.formResponseService.isExploreView();
  }

  deleteFormResponse(response: any, index: number, $event: any): void {
    $event.stopPropagation();
    const args = [
      {
        fn: this.formResponseService.deleteResponse.bind(this.formResponseService),
        args: [response._id]
      },
      {
        fn: this.removeResponseFromUI.bind(this),
        args: [response._id]
      }
    ],
    responseName = 'Response ' + (index + 1) + ' - ' + response.wwdatesubmitcheck33254;

    this.deleteConfirmationOverlayService.checkDelete(args, responseName);
  }

  removeResponseFromUI(response: any): void {
    this.currentFormResponses = this.currentFormResponses.filter(responseName => responseName._id !== response._id);
  }

  goToResponse(id: string, $event: any): void {
    $event.stopPropagation();
    this.formResponseService.setExploreView(id);
  }

  goBack(): void {
    if (this.isListView()) {
      this.adminService.setCurrentView('forms');
    } else {
      this.formResponseService.setListView();
    }
  }

}
