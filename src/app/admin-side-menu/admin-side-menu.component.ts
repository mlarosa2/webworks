import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';

@Component({
  selector: 'app-admin-side-menu',
  templateUrl: './admin-side-menu.component.html',
  styleUrls: ['./admin-side-menu.component.css']
})
export class AdminSideMenuComponent implements OnInit {
  constructor(private adminService: AdminService,
              private pageService: PageService) { }

  ngOnInit() {
  }

  getViews(): String[] {
    return this.adminService.getViews();
  }

  setView(view: String): void {
    this.adminService.setCurrentView(view.toLowerCase());
    if (view === 'Pages') {
      this.pageService.setPageHome();
    }
  }

}
