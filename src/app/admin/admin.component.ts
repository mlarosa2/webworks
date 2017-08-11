import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../admin-auth.service';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [
    AdminService,
    PageService
  ]
})
export class AdminComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService,
              private adminService: AdminService) { }

  ngOnInit() {
  }

  isLoggedIn(): Boolean {
    return this.adminAuthService.isLoggedIn();
  }

  getUserName(): String {
    return this.adminAuthService.getUserName();
  }

}
