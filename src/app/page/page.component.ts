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
  private model: Page = new Page('', '');
  constructor(private pageService: PageService) { }

  ngOnChanges() {
    const title = this.title;
    this.pageService.getPage(title)
      .then(page => {
        this.model.title = title;
        this.model.body  = page.json().body;
      });
  }

  onSubmit() {
    this.pageService.updatePage(this.title, this.model);
  }

}
