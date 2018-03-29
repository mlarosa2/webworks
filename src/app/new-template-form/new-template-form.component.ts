import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateService } from '../template.service';
import { MonacoService } from '../monaco.service';

@Component({
  selector: 'app-new-template-form',
  templateUrl: './new-template-form.component.html',
  styleUrls: [
    '../css/forms.css',
    './new-template-form.component.css'
  ]
})
export class NewTemplateFormComponent implements OnInit, OnDestroy {
  private editor: any;
  constructor(private templateService: TemplateService,
              private monacoService: MonacoService) { }

  ngOnInit() {
    this.editor = this.monacoService.create(
      document.querySelector('#monaco')
    );
  }

  ngOnDestroy() {
    this.monacoService.destroy(this.editor);
  }

  model: any = {title: '', body: '', type: '', global: false};

  onSubmit(): void {
    this.model.body = this.monacoService.getValue(this.editor);
    this.templateService.createNewTemplate(this.model.title, this.model.body);
  }

  goBack(): void {
    this.templateService.setTemplateHome();
  }

}
