import { Component, OnChanges, OnDestroy, Input } from '@angular/core';
import { TemplateService } from '../template.service';
import { MonacoService } from '../monaco.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: [
    '../css/forms.css',
    './template.component.css'
  ]
})
export class TemplateComponent implements OnChanges, OnDestroy {
  @Input() title: string;

  private model: any = {title: '', body: ''};
  private editor: any;
  constructor(private templateService: TemplateService,
              private monacoService: MonacoService) { }

  ngOnChanges() {
    const title = this.title

    this.editor = this.monacoService.create(
      document.querySelector('#monaco')
    );

    this.templateService.getTemplate(this.title)
      .then(template => {
        this.model.title  = title;
        this.model.body   = template.json().body;
        this.monacoService.setValue(this.editor, this.model.body);
      });
  }

  ngOnDestroy() {
    this.monacoService.destroy(this.editor);
  }

  onSubmit(): void {
    this.templateService.updateTemplate(this.title, this.model.body, this.model);
  }

  goBack(): void {
    this.templateService.setTemplateHome();
  }
}