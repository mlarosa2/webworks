import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Page } from './page';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private pageUrl: String = 'api';
  private pageHome: Boolean = true;
  private specificPage: Boolean = false;
  private createPage: Boolean = false;
  private selectedPage: String;
  private titles: String[];
  constructor(private http: Http) { }

  getPageTitles(): Promise<any>{
    return this.http
               .get(`${this.pageUrl}/pages`)
               .toPromise()
  }

  getSelectedPage(): String {
    return this.selectedPage;
  }

  getPageHome(): Boolean {
    return this.pageHome;
  }

  getSpecficPage(): Boolean {
    return this.specificPage;
  }

  getCreatePage(): Boolean {
    return this.createPage;
  }

  setPageHome(): void {
    this.pageHome     = true;
    this.specificPage = false;
    this.createPage   = false;
    this.loadTitles();
  }

  setSpecficPage(title:String): void {
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

  createNewPage(title: String, body: String): void {
    this.http
      .post(`${this.pageUrl}/pages`, JSON.stringify({title: title, body: body}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.setPageHome();
      })
      .catch(this.handleError);
  }

  getPage(title: String): Promise<any> {
    return this.http
      .get(`${this.pageUrl}/page/${title}`)
      .toPromise()
  }

  loadTitles(): void {
    this.getPageTitles()
        .then(data => {
          this.titles = JSON.parse(data._body).map(title => {return title;});
        });
  }

  getTitles(): String[] {
    return this.titles;
  }

  deletePage(title:String): Promise<void> {
    return this.http
      .delete(`${this.pageUrl}/page/${title}`, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  updatePage(title: String, body: Page): Promise<void> {
    return this.http
      .put(`${this.pageUrl}/page/${title}`, {body: body})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
