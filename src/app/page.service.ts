import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Page } from './page';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private pageUrl: string = 'api';
  private pageHome: boolean = true;
  private specificPage: boolean = false;
  private createPage: boolean = false;
  private selectedPage: string;
  private titles: string[];
  constructor(private http: Http) { }

  getPageTitles(): Promise<any>{
    return this.http
               .get(`${this.pageUrl}/pages`)
               .toPromise()
  }

  getSelectedPage(): string {
    return this.selectedPage;
  }

  getPageHome(): boolean {
    return this.pageHome;
  }

  getSpecficPage(): boolean {
    return this.specificPage;
  }

  getCreatePage(): boolean {
    return this.createPage;
  }

  setPageHome(): void {
    this.pageHome     = true;
    this.specificPage = false;
    this.createPage   = false;
    this.loadTitles();
  }

  setSpecficPage(title: string): void {
    this.pageHome     = false;
    this.specificPage = true;
    this.createPage   = false;
    this.selectedPage = title;
  }

  setCreatePage(): void {
    this.pageHome     = false;
    this.specificPage = false;
    this.createPage   = true;
  }

  createNewPage(title: string, body: string): void {
    this.http
      .post(`${this.pageUrl}/pages`, JSON.stringify({title: title, body: body}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.setPageHome();
      })
      .catch(this.handleError);
  }

  getPage(title: string): Promise<any> {
    return this.http
      .get(`${this.pageUrl}/page/${title}`)
      .toPromise();
  }

  loadTitles(): void {
    this.getPageTitles()
        .then(data => {
          this.titles = JSON.parse(data._body).map(title => {return title;});
        });
  }

  getTitles(): string[] {
    return this.titles;
  }

  deletePage(title: string): Promise<void> {
    return this.http
      .delete(`${this.pageUrl}/page/${title}`, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  updatePage(title: string, body: Page): Promise<void> {
    return this.http
      .put(`${this.pageUrl}/page/${title}`, {body: body})
      .toPromise()
      .then(() => this.setPageHome())
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
