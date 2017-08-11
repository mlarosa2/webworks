import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  private titles: String[];
  private pageHome: Boolean = true;
  private specificPage: Boolean = false;
  private createPage: Boolean = false;
  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.loadTitles();           
  }

  getTitles(): String[] {
    return this.titles;
  }

  loadTitles(): void {
    this.pageService.getPageTitles()
        .subscribe(titles => this.titles = titles);
  }

  isPageHome(): Boolean {
    return this.pageHome;
  }

  isSpecificPage(): Boolean {
    return this.specificPage;
  }

  isCreatePage(): Boolean {
    return this.createPage;
  }
}
