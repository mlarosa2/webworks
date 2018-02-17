import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AssetService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private assetUrl: string = 'api';
  private assetHome: boolean = true;
  private specificAsset: boolean = false;
  private createAsset: boolean = false;
  private selectedAsset: string;
  private titles: string[];
  constructor(private http: Http) { }

  getAssetTitles(): Promise<any> {
    return this.http 
            .get(`${this.assetUrl}/assets`)
            .toPromise();
  }
  
  getSelectedAsset(): string {
      return this.selectedAsset;
    }

  getAssetHome(): boolean {
    return this.assetHome;
  }

  getSpecficAsset(): boolean {
    return this.specificAsset;
  }

  getCreateAsset(): boolean {
    return this.createAsset;
  }

  setAssetHome(): void {
    this.assetHome     = true;
    this.specificAsset = false;
    this.createAsset   = false;
    this.loadTitles();
  }

  setSpecficAsset(title: string): void {
    this.assetHome     = false;
    this.specificAsset = true;
    this.createAsset   = false;
    this.selectedAsset = title;
  }

  setCreateAsset(): void {
    this.assetHome     = false;
    this.specificAsset = false;
    this.createAsset   = true;
  }

  createNewAsset(title: string, body: string, type: string): void {
    this.http
      .post(`${this.assetUrl}/assets`, JSON.stringify({title: title, body: body, type: type}), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.setAssetHome();
      })
      .catch(this.handleError);
  }

  getAsset(title: string): Promise<any> {
    return this.http
      .get(`${this.assetUrl}/asset/${title}`)
      .toPromise();
  }

  loadTitles(): void {
    this.getAssetTitles()
        .then(data => {
          this.titles = data.json();
        });
  }

  getTitles(): string[] {
    return this.titles;
  }

  deleteAsset(title: string): Promise<void> {
    return this.http
      .delete(`${this.assetUrl}/asset/${title}`, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  updateAsset(title: string, body: string, type: string): Promise<void> {
    return this.http
      .put(`${this.assetUrl}/asset/${title}`, {body: body})
      .toPromise()
      .then(() => this.setAssetHome())
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
