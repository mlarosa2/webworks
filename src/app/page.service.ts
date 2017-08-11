import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

}
