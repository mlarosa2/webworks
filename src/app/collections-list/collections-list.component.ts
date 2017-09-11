import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.css']
})
export class CollectionsListComponent implements OnInit {

  constructor(private collectionsService: CollectionsService) { }

  ngOnInit() {
  }

  getTitles(): string[] {
    return this.collectionsService.getTitles();
  }

  goToCollection(title: string): void {
    this.collectionsService.selectCollection(title);
  }

  collectionSelected(): boolean {
    return this.collectionsService.isCollectionSelected();
  }

  deleteCollection(title: string): void {
    this.collectionsService.deleteCollection(title);
  }
}
