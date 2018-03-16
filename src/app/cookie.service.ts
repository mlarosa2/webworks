import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  private cookies: string[] = [];
  constructor() {
    // first thing is first parse the cookies
    const firstCut: string[] = document.cookie.split('=');
    for (let i: number = 0; i < firstCut.length; i++) {
      let cookieLength: number = firstCut[i].length;
      if (firstCut[i][cookieLength - 1] === ';') {
        firstCut[i] = firstCut[i].substr(0, cookieLength - 1);
      }
    }
    for (let i: number = 0; i < firstCut.length; i++) {
      this.cookies = this.cookies.concat(
        firstCut[i].split(';').map(cut => cut.trim())
      );
    }
  }

  authenticated(): boolean {
    const userKeyIndex: number = this.find('46a11f1333d6b2079f8da41e63d810406e9de5b6eb18c80f434f6c79da1f525b');
    const passKeyIndex: number = this.find('a6235752ef51e86cdf1d56634948c32f75fe6a492e212797315ea43f5ecfa66e');

    if (userKeyIndex > -1 && passKeyIndex > -1) {
      return true;
    }

    return false;
  }

  getCSURFToken(): string {
    const tokenKeyIndex: number = this.find('27a558298ca47358d3bb29e74323aa832fc4f61374759d221e7e18610f853fcd');
    return this.cookies[tokenKeyIndex + 1];
  }

  private find(key: string): number {
    for (let i: number = 0; i < this.cookies.length; i++) {
      if (this.cookies[i] === key) {
        return i;
      }
    }

    return -1;
  }
}
