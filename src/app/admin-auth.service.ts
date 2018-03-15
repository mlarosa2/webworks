import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AdminUser } from './admin-user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminAuthService {
  private loggedIn: boolean = false;
  private userName: string = '';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private authUrl: string = 'api';
  constructor(private http: Http) {
      let token: string;
      let cookies = document.cookie.split('=');
      let csrfIdx = cookies.indexOf('27a558298ca47358d3bb29e74323aa832fc4f61374759d221e7e18610f853fcd');
      token = cookies[csrfIdx + 1];

      this.headers.append('csrf-token', token);
  }

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

  signUp(user: AdminUser): Promise<any> {
    return this.http
      .post('api/signup', 
            JSON.stringify({username: user.username, password: user.password, email: user.email}),
            {headers: this.headers}
      )
      .toPromise();
  }

  getUserName(): string {
    return this.userName;
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
