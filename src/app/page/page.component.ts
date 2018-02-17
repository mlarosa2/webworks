import { Component, OnChanges, Input } from '@angular/core';
import { PageService } from '../page.service';
import { AssetService } from '../asset.service';
import { Page } from '../page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnChanges {
  @Input() title: string;
  private model: Page = new Page('', '', [], []);
  private newCSS: string = '';
  private newJS: string = '';
  constructor(private pageService: PageService,
              private assetService: AssetService) { }

  ngOnChanges() {
    const title = this.title;
    this.pageService.getPage(title)
      .then(page => {
        this.model.title = title;
        this.model.body  = page.json().body;
        this.model.css   = page.json().css || [];
        this.model.js    = page.json().js || [];
      });
  }

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

  onSubmit() {
    this.pageService.updatePage(this.title, this.model);
  }

}
