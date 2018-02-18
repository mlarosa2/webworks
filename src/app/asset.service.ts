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
  private selectedAsset: any;
  private titles: string[];
  private allAssets: any[] = [];
  constructor(private http: Http) { }

  getAssets(): Promise<any> {
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
    this.loadAssets();
  }

  setSpecficAsset(title: string, type: string): void {
    this.assetHome     = false;
    this.specificAsset = true;
    this.createAsset   = false;
    this.selectedAsset = {title: title, type: type};
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

  getAsset(title: string, type: string): Promise<any> {
    return this.http
      .get(`${this.assetUrl}/asset/${title}/${type}`)
      .toPromise();
  }

  loadAssets(): void {
    this.getAssets()
        .then(data => {
          this.titles = data.json().map(asset => asset.title);
          this.allAssets = data.json().map(asset => asset);
        });
  }

  getAllAssets(): any[] {
    return this.allAssets;
  }

  getTitles(): string[] {
    return this.titles;
  }

  deleteAsset(title: string, type: string): Promise<void> {
    return this.http
      .delete(`${this.assetUrl}/asset/${title}/${type}`, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  updateAsset(title: string, body: string, type: string, model: any): Promise<void> {
    return this.http
      .put(`${this.assetUrl}/assets`, {type: type, body: body, title: title, newType: model.type, newTitle: model.title})
      .toPromise()
      .then(() => this.setAssetHome())
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
