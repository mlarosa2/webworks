import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AdminUser } from './admin-user';
import { CookieService } from './cookie.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminAuthService {
  private loggedIn: boolean = false;
  private userName: string = '';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private authUrl: string = 'api';
  private csrfToken: string;
  private checkingFeAuth: boolean = false;
  constructor(private http: Http,
              private cookieService: CookieService) {
      this.csrfToken = cookieService.getCSURFToken();

    if (this.cookieService.authenticated()) {
      this.feLogin();
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logIn(user: string, password: string):void {
    this.http
      .post(`${this.authUrl}/login`, JSON.stringify({username: user, password: password, csrf: this.csrfToken}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.loggedIn = true; 
        this.userName = user;
      })
      .catch(this.handleError);
    
  }

  feLogin() {
    this.checkingFeAuth = true;
    this.http
      .post(`${this.authUrl}/login/fe`, {csrf: this.csrfToken}, {headers: this.headers})
      .toPromise()
      .then((res) => {
        try {
          this.loggedIn = true;
          this.checkingFeAuth = false;
          this.userName = res.json().user;
        } catch (err) {
          this.loggedIn = false;
          this.userName = '';
          // fail silently
        }
      }); // dont want to catch not error if cant sign in via cookie
  }

  signUp(user: AdminUser): Promise<any> {
    return this.http
      .post('api/signup', 
            JSON.stringify({username: user.username, password: user.password, email: user.email, csrf: this.csrfToken}),
            {headers: this.headers}
      )
      .toPromise();
  }

  signOut(): void {
    this.http
      .delete(`${this.authUrl}/login`, {headers: this.headers})
      .toPromise()
      .then(res => {
        this.loggedIn = false;
      })
      .catch(this.handleError);
  }

  getUserName(): string {
    return this.userName;
  }

  cookieAuth(): boolean {
    return this.checkingFeAuth;
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
