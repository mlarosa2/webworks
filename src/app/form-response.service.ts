import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormResponseService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private formResponsesUrl: string = 'api/form-responses';
  private singleFormResponseUrl: string = 'api/form-response';
  private currentFormResponses: string[];
  private currentForm: string;
  private listView: boolean;
  private exploreView: boolean;
  private formResponseToExplore: string;

  constructor(private http: Http) { }

  loadFormResponses(): void {
    this.http
      .get(`${this.formResponsesUrl}/${this.currentForm}`)
      .toPromise()
      .then(response => {
        this.currentFormResponses = response.json();
      }).catch(this.handleError);
  }

  getFormResponses(): any[] {
    return this.currentFormResponses;
  }

  setListView(): void {
    this.listView    = true;
    this.exploreView = false;
  }

  setExploreView(title: string): void {
    this.listView    = false;
    this.exploreView = true;
    this.formResponseToExplore = title;
  }



  isListView(): boolean {
    return this.listView;
  }

  isExploreView(): boolean {
    return this.exploreView;
  }

  deleteResponse(response: string): void {
    this.http
      .delete(`${this.singleFormResponseUrl}/${this.currentForm}/${response}`, {headers: this.headers})
      .toPromise()
      .then(() => {
        this.loadFormResponses();
      })
      .catch(this.handleError);
  }

  getFormResponse(): Promise<any> {
    return this.http
      .get(`${this.singleFormResponseUrl}/${this.currentForm}/${this.formResponseToExplore}`)
      .toPromise();
  }

  setCurrentForm(title: string): void {
    this.currentForm = title;
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
