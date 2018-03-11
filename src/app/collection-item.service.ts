import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CollectionItem } from './collection-item';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class CollectionItemService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private collectionItemsUrl: string = 'api/collection-items';
  private collectionsUrl: string = 'api/collection';
  private titlesForCurrentCollection: string[];
  private templateFields: string[];
  private currentCollection: string; // name of collection we are looking at items for
  private listView: boolean;
  private newItemView: boolean;
  private updateItemView: boolean;
  private collectionItemToEdit: string;

  constructor(private http: Http) {
      let token: string;
      let cookies = document.cookie.split('=');
      let csrfIdx = cookies.indexOf('27a558298ca47358d3bb29e74323aa832fc4f61374759d221e7e18610f853fcd');
      token = cookies[csrfIdx + 1];

      this.headers.append('csrf-token', token);
  }
  
  loadCollectionItems(): void {
    this.http
      .get(`${this.collectionItemsUrl}/${this.currentCollection}`)
      .toPromise()
      .then(response => {
        this.titlesForCurrentCollection = response.json();
      })
      .catch(this.handleError);
  }

  setCurrentCollection(title: string): void {
    this.currentCollection = title;
  }

  getCollectionItems(): string[] {
    return this.titlesForCurrentCollection;
  }

  getCollectionItem(): Promise<any> {
    return this.http
      .get(`${this.collectionItemsUrl}/${this.currentCollection}/${this.collectionItemToEdit}`)
      .toPromise();
  }

  setTemplate(title: string): void {
    this.http
      .get(`${this.collectionsUrl}/${title}`)
      .toPromise()
      .then(collection => {
        this.templateFields = collection.json().fields;
      })
      .catch(this.handleError);
  }

  getTemplate(): string[] {
    return this.templateFields;
  }

  setListView(): void {
    this.listView       = true;
    this.newItemView    = false;
    this.updateItemView = false;
  }

  setNewItemView(): void {
    this.listView       = false;
    this.newItemView    = true;
    this.updateItemView = false;
  }
  
  setUpdateItemView(title: string): void {
    this.listView       = false;
    this.newItemView    = false;
    this.updateItemView = true;
    this.collectionItemToEdit = title;
  }

  isListView(): boolean {
    return this.listView;
  }

  isNewItemView(): boolean {
    return this.newItemView;
  }

  isUpdateItemView(): boolean {
    return this.updateItemView;
  }

  addItem(collectionItem: CollectionItem): void {
    this.http
      .post(`${this.collectionItemsUrl}`, JSON.stringify(collectionItem), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.loadCollectionItems();
        this.setListView();
      })
      .catch(this.handleError);
  }

  updateItem(collectionItem: CollectionItem): void {
    this.http
      .put(`${this.collectionItemsUrl}`,
        { 
          title: this.collectionItemToEdit,
          belongsTo: this.currentCollection,
          fields: collectionItem.getFields(),
          newTitle: collectionItem.getTitle()
        }
      )
      .toPromise()
      .then(() => {
        // need to update the list of titles
        this.titlesForCurrentCollection = this.titlesForCurrentCollection.map(title => {
          if (title === this.collectionItemToEdit) {
            return collectionItem.getTitle();
          }

          return title;
        });
        this.setListView();
      })
      .catch(this.handleError);
  }

  deleteItem(item: string): void {
    this.http
  .delete(`${this.collectionItemsUrl}`, {headers: this.headers, body: {title: item, belongsTo: this.currentCollection}})
      .toPromise()
      .then(() => {
        this.loadCollectionItems();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
