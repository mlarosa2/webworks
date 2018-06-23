import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Form } from './form';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormsService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private formsUrl: string = 'api/forms';
  private formResponseUrl: string = 'api/form-responses';
  private singularFormsUrl: string = 'api/form';
  private viewForms: boolean = false;
  private buildForm: boolean = false;
  private updateForm: boolean = false;
  private formResponses: boolean = false;
  private formsList: string[];
  private formSelected: boolean = false; // determines if a form is selected
  private selectedForm: Form; // stores the selected form

  constructor(private http: Http) { }

  isFormView(): boolean {
    return this.viewForms;
  }

  getForm(title: string): Promise<any> {
    return this.http
      .get(`${this.formsUrl}/${title}`)
      .toPromise();
  }

  setFormResponseView(): void {
    this.viewForms = false;
    this.buildForm = false;
    this.updateForm = false;
    this.formResponses = true;
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
    this.formResponses = false;
    this.loadTitles();
  }

  setBuildView(): void {
    this.viewForms = false;
    this.buildForm = true;
    this.updateForm = false;
    this.formResponses = false;
  }

  setUpdateView(): void {
    this.viewForms = false;
    this.buildForm = false;
    this.updateForm = true;
    this.formResponses = false;
  }

  getAllTitles(): Promise<any> {
    return this.http
      .get(`${this.formsUrl}`)
      .toPromise();
  }

  loadTitles(): void {
    this.getAllTitles()
      .then(response => {
        this.formsList = JSON.parse(response._body).map(form => form.title);
      })
      .catch(this.handleError);
  }

  getTitles(): string[] {
    return this.formsList;
  }

  saveForm(form: Form): void {
    this.http
      .post(`${this.formsUrl}`, JSON.stringify(form), {headers: this.headers})
      .toPromise()
      .then(response => {
        this.loadTitles();
        this.setFormView();
      })
      .catch(this.handleError);
  }

  deleteForm(title: String):void {
    this.http
      .delete(`${this.formsUrl}`, {headers: this.headers, body: {title: title}})
        .toPromise()
        .then(() => {
          this.setFormView();
        })
        .catch(this.handleError);
  }

  updateFormRecord(title: string, fields: object[], newTitle: string): Promise<void> {
    return this.http
      .put(`${this.formsUrl}`, {fields: fields, newTitle: newTitle, title: title}, {headers: this.headers})
      .toPromise()
      .then(() => {
        this.setFormView();
      })
      .catch(this.handleError);
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
        const form = response.json();
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

  selectFormResponses(title: string): void {
    this.setFormResponse(title);
    this.setFormResponseView();
  }

  setFormResponse(title: string) {
    this.http
      .get(`${this.formResponseUrl}/${title}`)
      .toPromise()
      .then(response => {
        this.formResponses = response.json();
      })
      .catch(this.handleError);
  }

  isFormResponseView(): boolean {
    return this.formResponses;
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
