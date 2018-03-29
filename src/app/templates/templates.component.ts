import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../template.service';
import { DeleteConfirmationOverlayService } from '../delete-confirmation-overlay.service'; 

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor(private templateService: TemplateService,
              private deleteConfirmationOverlayService: DeleteConfirmationOverlayService) { }

  ngOnInit() {
  }

  isTemplateHome(): boolean {
    return this.templateService.getTemplateHome();
  }

  getTemplates(): string[] {
    return this.templateService.getAllTemplates();
  }

  getSelectedTemplate(): string {
    return this.templateService.getSelectedTemplate();
  }

  isSpecificTemplate(): boolean {
    return this.templateService.getSpecficTemplate();
  }

  isCreateTemplate(): boolean {
    return this.templateService.getCreateTemplate();
  }

  goToTemplate(title: string): void {
    this.templateService.setSpecficTemplate(title);
  }

  deleteTemplate(title: string, event: any): void {
    event.stopPropagation();
    const args = [
      {
        fn: this.templateService.deleteTemplate.bind(this.templateService),
        args: [title]
      },
      {
        fn: this.templateService.loadTemplates.bind(this.templateService),
        args: []
      }
    ];

    this.deleteConfirmationOverlayService.checkDelete(args, title);
  }

}
