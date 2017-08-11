import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminAuthService {
  private loggedIn: Boolean = false;
  private userName: String = '';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private authUrl: String = 'api';
  constructor(private http: Http) { }

  isLoggedIn(): Boolean {
    return this.loggedIn;
  }

  logIn(user:String, password:String):void {
    this.http
      .post(`${this.authUrl}/login`, JSON.stringify({username: user, password: password}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.loggedIn = true; 
        this.userName = user;
      })
      .catch(this.handleError);
    
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
