import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-admin-side-menu',
  templateUrl: './admin-side-menu.component.html',
  styleUrls: ['./admin-side-menu.component.css']
})
export class AdminSideMenuComponent implements OnInit {
  constructor(private adminService: AdminService,
              private pageService: PageService,
              private mediaService: MediaService) { }

  ngOnInit() {
  }

  getViews(): String[] {
    return this.adminService.getViews();
  }

  setView(view: String): void {
    this.adminService.setCurrentView(view.toLowerCase());
    if (view === 'Pages') {
      this.pageService.setPageHome();
    } else if (view === 'Media') {
      this.mediaService.setFiles();
    }
  }

}
