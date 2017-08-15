import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css'],
  providers: [PageService]
})
export class FrontendComponent implements OnInit {
  private page: string;
  private body: string;
  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.page = window.location.pathname.substr(1).replace(/-/g, ' ');
    this.pageService.getPage(this.page).then(response => {
      this.body = response._body;
    });
  }

}
