import { Component, OnChanges, Input } from '@angular/core';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnChanges {
  @Input() title: string;
  private type: string;
  private model: any = {title: '', body: '', type: ''};
  constructor(private assetService: AssetService) { }

  ngOnChanges() {
    const title = this.title;
    this.assetService.getAsset(title)
      .then(asset => {
        this.model.title = title;
        this.model.body  = asset.json().body;
        this.model.type  = asset.json().type;
        this.type        = asset.json().type; 
      });
  }

  onSubmit() {
    this.assetService.updateAsset(this.title, this.model.body, this.type, this.model);
  }
}
