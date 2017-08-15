import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {

  constructor(private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.collectionsService.loadTitles();
  }

  isCollectionView(): boolean {
    return this.collectionsService.isCollectionView();
  }

  isBuildView(): boolean {
    return this.collectionsService.isBuildView();
  }

  isUpdateView(): boolean {
    return this.collectionsService.isUpdateView();
  }
}