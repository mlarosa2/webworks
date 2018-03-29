import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssetService } from '../asset.service';
import { MonacoService } from '../monaco.service';

@Component({
  selector: 'app-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: [
    '../css/forms.css',
    './new-asset-form.component.css'
  ]
})
export class NewAssetFormComponent implements OnInit, OnDestroy {
  private editor: any;
  constructor(private assetService: AssetService,
              private monacoService: MonacoService) { }

  ngOnInit() {
    this.editor = this.monacoService.create(
      document.querySelector('#monaco')
    );
  }

  ngOnDestroy() {
    this.monacoService.destroy(this.editor);
  }

  model: any = {title: '', body: '', type: '', global: false};

  onSubmit(): void {
    this.model.body = this.monacoService.getValue(this.editor);
    this.assetService.createNewAsset(this.model.title, this.model.body, this.model.type, this.model.global);
  }

  goBack(): void {
    this.assetService.setAssetHome();
  }

}
