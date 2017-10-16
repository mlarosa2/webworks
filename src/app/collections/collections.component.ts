import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  private selectedTitle: string;
  constructor(private collectionsService: CollectionsService) { }

  ngOnInit() {}

  isCollectionView(): boolean {
    return this.collectionsService.isCollectionView();
  }

  isBuildView(): boolean {
    return this.collectionsService.isBuildView();
  }

  isUpdateView(): boolean {
    return this.collectionsService.isUpdateView();
  }

  getSelectedCollectionTitle(): string {
    return this.collectionsService.getSelectedCollection().title;
  }
  
  getTitles(): string[] {
    return this.collectionsService.getTitles();
  }

  goToCollection(title: string): void {
    this.collectionsService.selectCollection(title);
    this.selectedTitle = title;
  }

  collectionSelected(): boolean {
    return this.collectionsService.isCollectionSelected();
  }

  deleteCollection(title: string): void {
    this.collectionsService.deleteCollection(title);
  }
}