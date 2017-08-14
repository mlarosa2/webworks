import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Media } from './media';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MediaService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private mediaUrl: String = 'api';
  private mediaPaths: String[];
  private uploadMode: Boolean = false;
  constructor(private http: Http) { }

  isUploadMode(): Boolean {
    return this.uploadMode;
  }

  turnOffUploadMode(): void {
    this.uploadMode = false;
  }

  turnOnUploadMode(): void {
    this.uploadMode = true;
  }

  upload(formData: FormData): Promise<void> {
    return this.http
            .post(`${this.mediaUrl}/media`, formData, new Headers({'Content-Type': 'multipart/form-data'}))
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
  }

  getFiles(): Promise<any> {
    return this.http
            .get(`${this.mediaUrl}/media`)
            .toPromise();
  }

  setFiles(): void {
    this.getFiles()
      .then(response => {
        this.mediaPaths = JSON.parse(response._body);
      })
      .catch(this.handleError);
  }

  getFilesList(): String[] {
    return this.mediaPaths;
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
