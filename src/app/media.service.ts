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
  private singleMode: Boolean = false;
  private singleFile: String; 
  constructor(private http: Http) { }

  isUploadMode(): Boolean {
    return this.uploadMode;
  }

  isSingleMode(): Boolean {
    return this.singleMode;
  }

  turnOffUploadMode(): void {
    this.uploadMode = false;
  }

  turnOnUploadMode(): void {
    this.uploadMode = true;
    if (this.singleMode) this.singleMode = false;
  }

  turnOffSingleMode(): void {
    this.singleMode = false;
    this.singleFile = null;
  }

  turnOnSingleMode(): void {
    this.singleMode = true;
    if (this.uploadMode) this.uploadMode = false;
  }

  upload(formData: FormData): Promise<void> {
    return this.http
            .post(`${this.mediaUrl}/media`, formData, new Headers({'Content-Type': 'multipart/form-data'}))
            .toPromise()
            .then(() => {
              this.setFiles();
            })
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

  setSingleFile(file: String): void {
    this.singleFile = file;
  }

  getSingleFile(): String {
    return this.singleFile;
  }

  getFilesList(): String[] {
    return this.mediaPaths;
  }

  isImage(file: String): Boolean {
    if (!file) return false;
    const ext = file.substr(file.lastIndexOf('.') + 1);
    const images = ['jpg', 'png', 'svg', 'gif'];
    return images.includes(ext);
  }

  deleteFile(file: String): void {
    this.http
      .delete(`${this.mediaUrl}/media/${file}`, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.setFiles();
        this.turnOffSingleMode();
      })
      .catch(this.handleError);
  }

  updateMedia(originalTitle: String, mediaData: any): void {
    this.http
      .put(`${this.mediaUrl}/media/${originalTitle}`, { updateTitle: `${mediaData.name}${mediaData.ext}`})
      .toPromise()
      .then(response => {
        this.setFiles();
        this.turnOffSingleMode();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}