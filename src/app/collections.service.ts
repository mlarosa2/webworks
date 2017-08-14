import { Injectable } from '@angular/core';

@Injectable()
export class CollectionsService {
  private viewCollections: Boolean = false;
  private buildCollection: Boolean = false;
  private updateCollection: Boolean = false;
  private selectedCollection: String;

  constructor() { }

  isCollectionView(): Boolean {
    return this.viewCollections;
  }

  isBuildView(): Boolean {
    return this.buildCollection;
  }

  isUpdateView(): Boolean {
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
}
