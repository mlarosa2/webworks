import { Component, OnInit, HostListener } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AssetService } from '../asset.service';
import { PageService } from '../page.service';
import { GlobalAssetsService } from '../global-assets.service';
import { FormSubmissionService } from '../form-submission.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css'],
  providers: [
                AssetService,
                PageService,
                GlobalAssetsService,
                FormSubmissionService,
                Title
             ]
})
export class FrontendComponent implements OnInit {
  @HostListener('submit') formSubmitted() {
    event.preventDefault();
    this.formSubmissionService.submitForm(event.target)
      .then(res => {

      },
      err => {

      });
  }
  private page: string;
  constructor(private pageService: PageService,
              private metaService: Meta,
              private globalAssetsService: GlobalAssetsService,
              private formSubmissionService: FormSubmissionService,
              private titleService: Title) { }

  ngOnInit() {
    this.page = window.location.pathname.substr(1).replace(/-/g, ' ');
    if (this.page === '') {
      this.page = 'HOMEPAGE';
    }
    
    this.buildPage();
  }

  buildPage(): void {
    this.pageService.getPage(this.page).then(response => {
      document.getElementById('content-page-exclusive-fe-component').innerHTML = response.json().parsed;
      this.metaService.addTags(response.json().meta);
      if (this.page === 'HOMEPAGE') {
        this.titleService.setTitle(window.location.host);
      } else {
        this.titleService.setTitle(this.page);
      }
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
    },
    (err) => {
      this.page = '404';
      this.buildPage();
    });
  }
}
