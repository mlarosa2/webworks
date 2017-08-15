import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminAuthService {
  private loggedIn: boolean = false;
  private userName: string = '';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private authUrl: string = 'api';
  constructor(private http: Http) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logIn(user: string, password: string):void {
    this.http
      .post(`${this.authUrl}/login`, JSON.stringify({username: user, password: password}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.loggedIn = true; 
        this.userName = user;
      })
      .catch(this.handleError);
    
  }

  getUserName(): string {
    return this.userName;
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
