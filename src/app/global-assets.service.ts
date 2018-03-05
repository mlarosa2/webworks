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

  createNewGlobalAsset(title: string, type: string): void {
    this.http
      .post(`${this.globalAssetUrl}/global-assets`, JSON.stringify({title: title, type: type}), {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  deleteGlobalAsset(title: string, type: string): void {
    this.http
      .delete(`${this.globalAssetUrl}/asset/${title}/${type}`, {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
