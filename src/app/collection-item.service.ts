import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class CollectionItemService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private collectionItemsUrl: string = 'api/collection-items';
  private titlesForCurrentCollection: string[];
  private listView: boolean;
  private newItemView: boolean;
  private updateItemView: boolean;
  constructor(private http: Http) { }
  
  loadCollectionItems(title: string): void {
    this.http
      .get(`${this.collectionItemsUrl}/${title}`)
      .toPromise()
      .then(response => {
        this.titlesForCurrentCollection = JSON.parse(response.json()._body);
      })
      .catch(this.handleError);
  }

  getCollectionItems(): string[] {
    return this.titlesForCurrentCollection;
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
  
  setupdateItemView(): void {
    this.listView       = false;
    this.newItemView    = false;
    this.updateItemView = true;
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

  private handleError(error: any): void {
    console.log('woo boy build this out');
    console.error(error._body);
  }
}
