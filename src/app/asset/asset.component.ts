import { Component, OnChanges, Input } from '@angular/core';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnChanges {
  @Input() title: string;
  @Input() type: string;
  private model: any = {title: '', body: '', type: ''};
  constructor(private assetService: AssetService) { }

  ngOnChanges() {
    const title = this.title;
    this.assetService.getAsset(title)
      .then(asset => {
        this.model.title = title;
        this.model.body  = asset.json().body;
      });
  }

  onSubmit() {
    this.assetService.updateAsset(this.title, this.type, this.model);
  }

}
