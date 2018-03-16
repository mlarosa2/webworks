import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from './cookie.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GlobalAssetsService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private globalAssetUrl: string = 'api';
  private titles: string[];
  private csrfToken: string;
  constructor(private http: Http,
              private cookieService: CookieService) {
      this.csrfToken = cookieService.getCSURFToken();
  }

  createNewGlobalAsset(title: string, type: string): Promise<any> {
    return this.http
      .post(`${this.globalAssetUrl}/global-assets`, JSON.stringify({title: title, type: type, csrf: this.csrfToken}), {headers: this.headers})
      .toPromise()
      .catch(this.handleError);
  }

  deleteGlobalAsset(title: string, type: string): Promise<any> {
    return this.http
      .delete(`${this.globalAssetUrl}/global-assets/${title}/${type}`, {headers: this.headers, body: {csrf: this.csrfToken}})
      .toPromise()
      .catch(this.handleError);
  }

  getAllGlobals(): Promise<any> {
    return this.http
      .get(`${this.globalAssetUrl}/global-assets`)
      .toPromise()
      .catch(this.handleError);
  } 

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
