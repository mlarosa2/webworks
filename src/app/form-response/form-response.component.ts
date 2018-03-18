import { Component, OnChanges, Input } from '@angular/core';
import { FormResponseService } from '../form-response.service';

@Component({
  selector: 'app-form-response',
  templateUrl: './form-response.component.html',
  styleUrls: ['./form-response.component.css']
})
export class FormResponseComponent implements OnChanges {
  @Input() belongsTo: string;
  private formResponse: any;

  constructor(private formResponseService: FormResponseService) { }

  ngOnChanges() {
    this.formResponseService.getFormResponse()
      .then(response => {
        this.formResponse = response.json();
      });
  }

  goBack(): void {
    this.formResponseService.setListView();
  }

}
