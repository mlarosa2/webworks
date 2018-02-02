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
  
  setAssetView(): void {
    this.assetHome = true;
    this.specificAsset = false;
    this.createAsset = false;
    this.loadAssets();
  }

  loadAssets(): void {
    this.getAssetTitles
  }
}
