import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  constructor(private pageService: PageService) { }

  ngOnInit() {       
  }

  isPageHome(): Boolean {
    return this.pageService.getPageHome();
  }

  getTitles(): String[] {
    return this.pageService.getTitles();
  }

  getSelectedPage(): String {
    return this.pageService.getSelectedPage();
  }

  isSpecificPage(): Boolean {
    return this.pageService.getSpecficPage();
  }

  isCreatePage(): Boolean {
    return this.pageService.getCreatePage();
  }

  goToPage(title: String): void {
    this.pageService.setSpecficPage(title);
  }

  deletePage(title: String, event: any): void {
    event.stopPropagation();
    this.pageService.deletePage(title);
    this.pageService.loadTitles();
  }
}
