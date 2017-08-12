import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  private titles: String[];
  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.loadTitles();           
  }

  getTitles(): String[] {
    return this.titles;
  }

  loadTitles(): void {
    this.pageService.getPageTitles()
        .then(data => {
          this.titles = JSON.parse(data._body).map(title => {return title;});
        });
  }

  isPageHome(): Boolean {
    return this.pageService.getPageHome();
  }

  isSpecificPage(): Boolean {
    return this.pageService.getSpecficPage();
  }

  isCreatePage(): Boolean {
    return this.pageService.getCreatePage();
  }
}
