import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from './cookie.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TemplateService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private templateUrl: string = 'api';
  private templateHome: boolean = true;
  private specificTemplate: boolean = false;
  private createTemplate: boolean = false;
  private selectedTemplate: string;
  private titles: string[];
  private allTemplates: any[] = [];
  private csrfToken: string;
  constructor(private http: Http,
              private cookieService: CookieService) {
      this.csrfToken = cookieService.getCSURFToken();
  }

  getTemplates(): Promise<any> {
    return this.http 
            .get(`${this.templateUrl}/Templates`)
            .toPromise();
  }
  
  getSelectedTemplate(): string {
      return this.selectedTemplate;
    }

  getTemplateHome(): boolean {
    return this.templateHome;
  }

  getSpecficTemplate(): boolean {
    return this.specificTemplate;
  }

  getCreateTemplate(): boolean {
    return this.createTemplate;
  }

  setTemplateHome(): void {
    this.templateHome  = true;
    this.specificTemplate = false;
    this.createTemplate   = false;
    this.loadTemplates();
  }

  setSpecficTemplate(title: string): void {
    this.templateHome     = false;
    this.specificTemplate = true;
    this.createTemplate   = false;
    this.selectedTemplate = title;
  }

  setCreateTemplate(): void {
    this.templateHome     = false;
    this.specificTemplate = false;
    this.createTemplate   = true;
  }

  createNewTemplate(title: string, body: string): void {
    this.http
      .post(`${this.templateUrl}/templates`, JSON.stringify({title: title, body: body, csrf: this.csrfToken}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.setTemplateHome();
      })
      .catch(this.handleError);
  }

  getTemplate(title: string): Promise<any> {
    return this.http
      .get(`${this.templateUrl}/template/${title}`)
      .toPromise();
  }

  loadTemplates(): void {
    this.getTemplates()
        .then(data => {
          this.titles = data.json().map(template => template.title);
          this.allTemplates = data.json().map(template => template);
        });
  }

  getAllTemplates(): any[] {
    return this.allTemplates;
  }

  getTitles(): string[] {
    return this.titles;
  }

  deleteTemplate(title: string): Promise<void> {
    return this.http
      .delete(`${this.templateUrl}/template/${title}`, {headers: this.headers, body: {csrf: this.csrfToken}})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  updateTemplate(title: string, body: string, model: any): Promise<void> {
    return this.http
      .put(`${this.templateUrl}/templates`, {body: body, title: title, newTitle: model.title, csrf: this.csrfToken}, {headers: this.headers})
      .toPromise()
      .then(() => this.setTemplateHome())
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
