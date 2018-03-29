import { Component, OnChanges, OnDestroy, Input } from '@angular/core';
import { AssetService } from '../asset.service';
import { MonacoService } from '../monaco.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: [
    '../css/forms.css',
    './asset.component.css'
  ]
})
export class AssetComponent implements OnChanges, OnDestroy {
  @Input() title: string;
  @Input() type: string;

  private model: any = {title: '', body: '', type: '', global: false};
  private editor: any;
  constructor(private assetService: AssetService,
              private monacoService: MonacoService) { }

  ngOnChanges() {
    const title = this.title

    this.editor = this.monacoService.create(
      document.querySelector('#monaco')
    );

    this.assetService.getAsset(this.title, this.type)
      .then(asset => {
        this.model.title  = title;
        this.model.body   = asset.json().body;
        this.model.type   = asset.json().type;
        this.model.global = asset.json().global;
        this.monacoService.setValue(this.editor, this.model.body);
      });
  }

  ngOnDestroy() {
    this.monacoService.destroy(this.editor);
  }

  onSubmit(): void {
    this.assetService.updateAsset(this.title, this.model.body, this.type, this.model);
  }

  goBack(): void {
    this.assetService.setAssetHome();
  }
}
