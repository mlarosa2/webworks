import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PageService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private pageUrl: String = 'api';
  constructor(private http: Http) { }

  getPageTitles(): Observable<String[]> {
    return this.http
               .get(`${this.pageUrl}/pages`)
               .map(response => response.json() as String[]);
  }
}
