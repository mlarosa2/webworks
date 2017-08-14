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
  }

  isCollectionView(): Boolean {
    return this.collectionsService.isCollectionView();
  }

  isBuildView(): Boolean {
    return this.collectionsService.isBuildView();
  }

  isUpdateView(): Boolean {
    return this.collectionsService.isUpdateView();
  }
}