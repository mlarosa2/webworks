import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Collection } from './collection';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CollectionsService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private collectionsUrl: string = 'api/collections';
  private singularCollectionUrl: string = 'api/collection';
  private collectionItemsUrl: string = 'api/collection-items';
  private viewCollections: boolean = false;
  private buildCollection: boolean = false;
  private updateCollection: boolean = false;
  private collectionItems: boolean = false;
  private collectionsList: string[];
  private collectionSelected: boolean = false; //determines if a collection is selected
  private selectedCollection: Collection; //stores the selected collection
  private selectedCollectionItems: Array<any>;  //stores collection items for selected collection

  constructor(private http: Http) { }

  isCollectionView(): boolean {
    return this.viewCollections;
  }

  getCollection(title: string): Promise<any> {
    return this.http
      .get(`${this.singularCollectionUrl}/${title}`)
      .toPromise();
  }


  isBuildView(): boolean {
    return this.buildCollection;
  }

  isUpdateView(): boolean {
    return this.updateCollection;
  }

  isItemView(): boolean {
    return this.collectionItems;
  }

  setCollectionView(): void {
    this.viewCollections = true;
    this.buildCollection = false;
    this.updateCollection = false;
    this.collectionItems = false;
    this.loadTitles();
  }

  setBuildView(): void {
    this.viewCollections = false;
    this.buildCollection = true;
    this.updateCollection = false;
    this.collectionItems = false;
  }

  setUpdateView(): void {
    this.viewCollections = false;
    this.buildCollection = false;
    this.updateCollection = true;
    this.collectionItems = false;
  }

  setCollectionItemsView(): void {
    this.viewCollections = false;
    this.buildCollection = false;
    this.updateCollection = false;
    this.collectionItems = true;
  }

  getAllTitles(): Promise<any> {
    return this.http
      .get(`${this.collectionsUrl}`)
      .toPromise();
  }

  loadTitles(): void {
    this.getAllTitles()
      .then(response => {
        this.collectionsList = JSON.parse(response._body).map(collection => {return collection.title;});
      })
      .catch(this.handleError);
  }

  loadCollectionItems(title): void {

  }

  getTitles(): string[] {
    return this.collectionsList;
  }

  saveCollection(collection: Collection): void {
    this.http
      .post(`${this.collectionsUrl}`, JSON.stringify(collection), {headers: this.headers})
      .toPromise()
      .then(response => {
        this.loadTitles();
        this.setCollectionView();
      })
      .catch(this.handleError)
  }

  deleteCollection(title: String):void {
    this.http
      .delete(`${this.collectionsUrl}`, {headers: this.headers, body: {title: title}})
        .toPromise()
        .then(() => {
          this.setCollectionView();
        })
        .catch(this.handleError);
  }

  updateCollectionRecord(title: string, fields: string[], newTitle: string): Promise<void> {
    return this.http
      .put(`${this.collectionsUrl}`, {fields: fields, newTitle: newTitle, title: title})
      .toPromise()
      .then(() => {
        this.setCollectionView();
      })
      .catch(this.handleError)
  }

  selectCollection(title: string): void {
    this.collectionSelected = true;
    this.setSelectedCollection(title);
    this.setUpdateView();
  }

  selectCollectionItems(title: string): void {
    this.setCollectionItems(title);
    this.setCollectionItemsView();
  }

  setCollectionItems(title: string): void {
    this.http
      .get(`${this.collectionItemsUrl}/${title}`)
      .toPromise()
      .then(response => {
        this.collectionItems = JSON.parse(response.json()._body);
      })
      .catch(this.handleError);
  }

  setSelectedCollection(title: string): void {
    this.http
      .get(`${this.singularCollectionUrl}/${title}`)
      .toPromise()
      .then(response => {
        let collection = JSON.parse(response.json()._body);
        this.selectedCollection = new Collection(collection.title, collection.fields);
        this.setUpdateView();
      })
      .catch(this.handleError);
  }

  getSelectedCollection(): Collection {
    return this.selectedCollection;
  }

  isCollectionSelected(): boolean {
    return this.collectionSelected;
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
