import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from './cookie.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormSubmissionService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private csrfToken: string
  constructor(private http: Http,
              private cookieService: CookieService) {
    this.csrfToken = cookieService.getCSURFToken();
  }

  submitForm(form: any): Promise<any> {
    const formData: any = {}
    for (let i = 0; i < form.elements.length; i++) {
      let ele = form.elements[i];
      if (ele.localName !== 'button') {
        formData[ele.name] = ele.value;
      }
    }
    formData.wwcsrfformsubmitcheck33254 = this.csrfToken;
    return this.http
      .post('api/submit-form', formData, {headers: this.headers})
      .toPromise();
  }
}
