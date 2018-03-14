import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AssetService } from '../asset.service';
import { PageService } from '../page.service';
import { GlobalAssetsService } from '../global-assets.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css'],
  providers: [
                AssetService,
                PageService,
                GlobalAssetsService
             ]
})
export class FrontendComponent implements OnInit {
  private page: string;

  constructor(private pageService: PageService,
              private metaService: Meta,
              private globalAssetsService: GlobalAssetsService) { }

  ngOnInit() {
    this.page = window.location.pathname.substr(1).replace(/-/g, ' ');
    if (this.page === '') {
      this.page = 'HOMEPAGE';
    }
    this.pageService.getPage(this.page).then(response => {
      document.getElementById('content-page-exclusive-fe-component').innerHTML = response.json().parsed;
      this.metaService.addTags(response.json().meta);
      
      // append globals then add specific
      this.globalAssetsService.getAllGlobals().then((globalResponse) => {
        globalResponse.json().forEach(ga => {
          if (ga.type === 'css') {
            let link = document.createElement('link');
            link.href = `/assets/css/${ga.title}.css`;
            link.rel  = 'stylesheet';
            link.title = ga.title;

            document.head.appendChild(link);
          } else {
            let scriptTag = document.createElement('script');
            scriptTag.src = `/assets/js/${ga.title}.js`;

            document.body.appendChild(scriptTag);
          }
        });
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
    });
  }
}
