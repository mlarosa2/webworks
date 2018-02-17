import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  constructor(private assetService: AssetService) { }

  ngOnInit() {
  }

  isAssetHome(): boolean {
    return this.assetService.getAssetHome();
  }

  getTitles(): string[] {
    return this.assetService.getTitles();
  }

  getSelectedAsset(): string {
    return this.assetService.getSelectedAsset();
  }

  isSpecificAsset(): boolean {
    return this.assetService.getSpecficAsset();
  }

  isCreateAsset(): boolean {
    return this.assetService.getCreateAsset();
  }

  goToAsset(title: string): void {
    this.assetService.setSpecficAsset(title);
  }

  deleteAsset(title: string, event: any): void {
    event.stopPropagation();
    this.assetService.deleteAsset(title);
    this.assetService.loadTitles();
  }
}
