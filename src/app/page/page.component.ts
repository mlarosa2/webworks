import { Component, OnChanges, Input } from '@angular/core';
import { PageService } from '../page.service';
import { AssetService } from '../asset.service';
import { Page } from '../page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: [
    '../css/forms.css',
    './page.component.css'
  ]
})
export class PageComponent implements OnChanges {
  @Input() title: string;
  private model: Page = new Page('', '', [], [], []);
  private newCSS: string = '';
  private newJS: string = '';
  private newMeta: any = {name: '', content: ''};
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
        this.model.meta  = page.json().meta || [];
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

  addMeta(name: string, content: string): void {
    this.model.meta.push({name: name, content: content});

    this.newMeta = {name: '', content: ''};
  }

  removeMeta(name: string, content: string): void {
    this.model.meta = this.model.meta.filter(tag => !(tag.name === name && tag.content === content));
  }

  onSubmit(): void {
    this.pageService.updatePage(this.title, this.model);
  }

  goBack(): void {
    this.pageService.setPageHome();
  }

}
