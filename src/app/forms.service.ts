import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Form } from './form';
import { CookieService } from './cookie.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormsService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private formsUrl: string = 'api/forms';
  private singularFormsUrl: string = 'api/form';
  private viewForms: boolean = false;
  private buildForm: boolean = false;
  private updateForm: boolean = false;
  private formsList: string[];
  private formSelected: boolean = false; //determines if a form is selected
  private selectedForm: Form //stores the selected form
  private csrfToken: string;

  constructor(private http: Http,
              private cookieService: CookieService) {
      this.csrfToken = cookieService.getCSURFToken();
  }

  isFormView(): boolean {
    return this.viewForms;
  }

  getForm(title: string): Promise<any> {
    return this.http
      .get(`${this.singularFormsUrl}/${title}`)
      .toPromise();
  }


  isBuildView(): boolean {
    return this.buildForm
  }

  isUpdateView(): boolean {
    return this.updateForm
  }

  setFormView(): void {
    this.viewForms = true;
    this.buildForm = false;
    this.updateForm = false;
    this.loadTitles();
  }

  setBuildView(): void {
    this.viewForms = false;
    this.buildForm = true;
    this.updateForm = false;
  }

  setUpdateView(): void {
    this.viewForms = false;
    this.buildForm = false;
    this.updateForm = true;
  }

  getAllTitles(): Promise<any> {
    return this.http
      .get(`${this.formsUrl}`)
      .toPromise();
  }

  loadTitles(): void {
    this.getAllTitles()
      .then(response => {
        this.formsList = JSON.parse(response._body).map(form => {return form.title;});
      })
      .catch(this.handleError);
  }

  getTitles(): string[] {
    return this.formsList;
  }

  saveForm(form: Form): void {
    form.csrf = this.csrfToken;
    this.http
      .post(`${this.formsUrl}`, JSON.stringify(form))
      .toPromise()
      .then(response => {
        this.loadTitles();
        this.setFormView();
      })
      .catch(this.handleError)
  }

  deleteForm(title: String):void {
    this.http
      .delete(`${this.formsUrl}`, {body: {title: title, csrf: this.csrfToken}})
        .toPromise()
        .then(() => {
          this.setFormView();
        })
        .catch(this.handleError);
  }

  updateFormRecord(title: string, fields: object[], newTitle: string): Promise<void> {
    return this.http
      .put(`${this.formsUrl}`, {fields: fields, newTitle: newTitle, title: title, csrf: this.csrfToken})
      .toPromise()
      .then(() => {
        this.setFormView();
      })
      .catch(this.handleError)
  }

  selectForm(title: string): void {
    this.formSelected = true;
    this.setSelectedForm(title);
    this.setUpdateView();
  }

  setSelectedForm(title: string): void {
    this.http
      .get(`${this.singularFormsUrl}/${title}`)
      .toPromise()
      .then(response => {
        let form = response.json();
        this.selectedForm = new Form(form.title, form.fields);
        this.setUpdateView();
      })
      .catch(this.handleError);
  }

  getSelectedForm(): Form {
    return this.selectedForm
  }

  isFormSelected(): boolean {
    return this.formSelected;
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
