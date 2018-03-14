import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Page } from './page';
import { AssetService } from './asset.service';
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
  constructor(private http: Http,
              private assetService: AssetService) {
      let token: string;
      let cookies = document.cookie.split('=');
      let csrfIdx = cookies.indexOf('27a558298ca47358d3bb29e74323aa832fc4f61374759d221e7e18610f853fcd');
      token = cookies[csrfIdx + 1];

      this.headers.append('csrf-token', token);
  }

  getPageTitles(): Promise<any> {
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
    if (this.assetService.getAllAssets().length === 0) {
      this.assetService.loadAssets();
    }
  }

  setSpecficPage(title: string): void {
    this.pageHome     = false;
    this.specificPage = true;
    this.createPage   = false;
    this.selectedPage = title;
    if (this.assetService.getAllAssets().length === 0) {
      this.assetService.loadAssets();
    }
  }

  setCreatePage(): void {
    this.pageHome     = false;
    this.specificPage = false;
    this.createPage   = true;
    if (this.assetService.getAllAssets().length === 0) {
      this.assetService.loadAssets();
    }
  }

  createNewPage(title: string, body: string, css: string[], js: string[], meta: any[]): void {
    this.http
      .post(`${this.pageUrl}/pages`, JSON.stringify(
        {
          title: title, 
          body: body, 
          css: css, 
          js: js,
          meta: meta
        }
      ), {headers: this.headers})
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
          this.titles = data.json();
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
      .put(`${this.pageUrl}/page/${title}`, {body: body}, {headers: this.headers})
      .toPromise()
      .then(() => this.setPageHome())
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
