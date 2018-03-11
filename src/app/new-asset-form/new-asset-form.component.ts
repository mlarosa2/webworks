import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: [
    '../css/forms.css',
    './new-asset-form.component.css'
  ]
})
export class NewAssetFormComponent implements OnInit {

  constructor(private assetService: AssetService) { }

  ngOnInit() {
  }

  model: any = {title: '', body: '', type: '', global: false};

  onSubmit(): void {
    this.assetService.createNewAsset(this.model.title, this.model.body, this.model.type, this.model.global);
  }

  goBack(): void {
    this.assetService.setAssetHome();
  }

}
