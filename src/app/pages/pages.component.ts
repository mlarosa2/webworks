import { Component, OnInit } from '@angular/core';
import { PageService } from '../page.service';
import { DeleteConfirmationOverlayService } from '../delete-confirmation-overlay.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: [
    '../css/item-menu.css',
    './pages.component.css'
  ]
})
export class PagesComponent implements OnInit {
  constructor(private pageService: PageService,
              private deleteConfirmationOverlayService: DeleteConfirmationOverlayService) { }

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
    const args = [
      {
        fn: this.pageService.deletePage.bind(this.pageService),
        args: [title]
      },
      {
        fn: this.pageService.loadTitles.bind(this.pageService),
        args: []
      }
    ];

    this.deleteConfirmationOverlayService.checkDelete(args, title);
  }
}
