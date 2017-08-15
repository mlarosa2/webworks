import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CollectionsService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private collectionsUrl: string = 'api';
  private viewCollections: boolean = false;
  private buildCollection: boolean = false;
  private updateCollection: boolean = false;
  private selectedCollection: string;
  private collectionsList: string[];

  constructor(private http: Http) { }

  isCollectionView(): boolean {
    return this.viewCollections;
  }

  isBuildView(): boolean {
    return this.buildCollection;
  }

  isUpdateView(): boolean {
    return this.updateCollection;
  }

  setCollectionView(): void {
    this.viewCollections = true;
    this.buildCollection = false;
    this.updateCollection = false;
  }

  setBuildView(): void {
    this.viewCollections = false;
    this.buildCollection = true;
    this.updateCollection = false;
  }

  setUpdateView(): void {
    this.viewCollections = false;
    this.buildCollection = false;
    this.updateCollection = true;
  }

  getAllTitles(): Promise<any> {
    return this.http
      .get(`${this.collectionsUrl}/collections`)
      .toPromise();
  }

  loadTitles(): void {
    this.getAllTitles()
      .then(response => {
        this.collectionsList = JSON.parse(response._body).map(title => {return title;});
      })
      .catch(this.handleError);
  }

  getTitles(): string[] {
    return this.collectionsList;
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
