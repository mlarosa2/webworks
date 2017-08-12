import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';

@Component({
  selector: 'app-admin-top-menu',
  templateUrl: './admin-top-menu.component.html',
  styleUrls: ['./admin-top-menu.component.css']
})

export class AdminTopMenuComponent implements OnInit {
  @Input() userName: String;
  
  constructor(private adminService: AdminService,
              private pageService: PageService) { }

  ngOnInit() {
  }

  goHome(): void {
    this.adminService.setCurrentView('home');
  }

  newPage(): void {
    this.adminService.setCurrentView('pages')
    this.pageService.setCreatePage();
  }

}
