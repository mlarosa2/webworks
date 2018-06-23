import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormSubmissionService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  submitForm(form: any): Promise<any> {
    const formData: any = {};
    for (let i = 0; i < form.elements.length; i++) {
      const ele = form.elements[i];
      if (ele.localName !== 'button') {
        formData[ele.name] = ele.value;
      }
    }

    formData.wwbelongstocheck33245 = String(form.className).replace(/~__~/g, ' ');

    return this.http
      .post('api/submit-form', formData, {headers: this.headers})
      .toPromise();
  }
}
