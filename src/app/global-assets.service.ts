import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GlobalAssetsService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private globalAssetUrl: string = 'api';
  private titles: string[];
  constructor(private http: Http) { }

  getGlobalAssets(): Promise<any> {
    return this.http 
          .get(`${this.globalAssetUrl}/global-assets`)
          .toPromise();
  }

  loadGlobalAssets(): void {
    this.getGlobalAssets()
        .then(data => {
          this.titles = data.json().map(asset => asset);
        });
  }

  getTitles(): string[] {
    return this.titles;
  }

  createNewGlobalAsset(title: string): void {
    this.http
      .post(`${this.globalAssetUrl}/global-assets`, JSON.stringify({title: title}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.titles.push(res.json().title);
      })
      .catch(this.handleError);
  }

  deleteGlobalAsset(title: string): void {

  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
