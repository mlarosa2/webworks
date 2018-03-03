import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AssetService } from '../asset.service';
import { PageService } from '../page.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css'],
  providers: [
                AssetService,
                PageService
             ]
})
export class FrontendComponent implements OnInit {
  private page: string;

  constructor(private pageService: PageService,
              private metaService: Meta) { }

  ngOnInit() {
    this.page = window.location.pathname.substr(1).replace(/-/g, ' ');
    if (this.page === '') {
      this.page = 'FRONTPAGE';
    }
    this.pageService.getPage(this.page).then(response => {
      document.getElementById('content-page-exclusive-fe-component').innerHTML = response.json().parsed;
      this.metaService.addTags(response.json().meta);
      response.json().css.forEach(style => {
        let link = document.createElement('link');
        link.href = `/assets/css/${style}.css`;
        link.rel  = 'stylesheet';
        link.title = style;

        document.head.appendChild(link);
      });
      response.json().js.forEach(script => {
        let scriptTag = document.createElement('script');
        scriptTag.src = `/assets/js/${script}.js`;

        document.body.appendChild(scriptTag);
      });
    });
  }
}
