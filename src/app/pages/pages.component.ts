import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: [
    '../css/item-menu.css',
    './pages.component.css'
  ]
})
export class PagesComponent implements OnInit {
  constructor(private pageService: PageService) { }

  ngOnInit() {       
  }

  isPageHome(): boolean {
    return this.pageService.getPageHome();
  }

  getTitles(): string[] {
    return this.pageService.getTitles();
  }

  getSelectedPage(): string {
    return this.pageService.getSelectedPage();
  }

  isSpecificPage(): boolean {
    return this.pageService.getSpecficPage();
  }

  isCreatePage(): boolean {
    return this.pageService.getCreatePage();
  }

  goToPage(title: string): void {
    this.pageService.setSpecficPage(title);
  }

  deletePage(title: string, event: any): void {
    event.stopPropagation();
    this.pageService.deletePage(title);
    this.pageService.loadTitles();
  }
}
