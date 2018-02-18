import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';
import { DeleteConfirmationOverlayService } from '../delete-confirmation-overlay.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: [
    '../css/item-menu.css',
    './assets.component.css'
  ]
})
export class AssetsComponent implements OnInit {

  constructor(private assetService: AssetService,
              private deleteConfirmationOverlayService: DeleteConfirmationOverlayService) { }

  ngOnInit() {
  }

  isAssetHome(): boolean {
    return this.assetService.getAssetHome();
  }

  getAssets(): string[] {
    return this.assetService.getAllAssets();
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

  goToAsset(title: string, type: string): void {
    this.assetService.setSpecficAsset(title, type);
  }

  deleteAsset(title: string, type: string, event: any): void {
    event.stopPropagation();
    const args = [
      {
        fn: this.assetService.deleteAsset.bind(this.assetService),
        args: [title, type]
      },
      {
        fn: this.assetService.loadAssets.bind(this.assetService),
        args: []
      }
    ];

    this.deleteConfirmationOverlayService.checkDelete(args, title);
  }
}
