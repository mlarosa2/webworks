import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  private cookies: string[];
  constructor() {
    this.cookies = document.cookie.split('=');
    for (let i: number = 0; i < this.cookies.length; i++) {
      let cookieLength: number = this.cookies[i].length;
      if (this.cookies[i][cookieLength - 1] === ';') {
        this.cookies[i] = this.cookies[i].substr(0, cookieLength - 1);
      }
    }
  }

  getCSURFToken(): string {
    for (let i: number  = 0; i < this.cookies.length; i++) {
      if (this.cookies[i] === '27a558298ca47358d3bb29e74323aa832fc4f61374759d221e7e18610f853fcd') {
        return this.cookies[i + 1];
      }
    }
  }
}
