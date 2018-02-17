import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';
import { AssetService } from '../asset.service';
import { Page } from '../page';

@Component({
  selector: 'app-new-page-form',
  templateUrl: './new-page-form.component.html',
  styleUrls: ['./new-page-form.component.css']
})
export class NewPageFormComponent implements OnInit {
  private allCSS: string[];
  private allJS: string[];
  private newCSS: string = '';
  private newJS: string = '';
  constructor(private pageService: PageService,
              private assetService: AssetService) { }

  ngOnInit() {
  }

  model = new Page('', '', [], []);

  getPageCSS(): string[] {
    return this.assetService.getAllAssets().filter(asset => asset.type === 'css').map(asset => asset.title);
  }

  removeCSS(title: string): void {
    this.model.css = this.model.css.filter(css => css !== title);
  }

  addCSS(title: string): void {
    if (!this.model.css.includes(title) && title) {
      this.model.css.push(title);
    }

    this.newCSS = '';
  }

  getPageJS(): string[] {
    return this.assetService.getAllAssets().filter(asset => asset.type === 'js').map(asset => asset.title);
  }

  removeJS(title: string): void {
    this.model.js = this.model.js.filter(js => js !== title);
  }

  addJS(title: string): void {
    if (!this.model.js.includes(title) && title) {
      this.model.js.push(title);
    }

    this.newJS = '';
  }

  onSubmit(): void {
    this.pageService.createNewPage(this.model.title, this.model.body);
  }

}
