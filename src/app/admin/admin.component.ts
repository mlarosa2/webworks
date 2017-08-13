import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../admin-auth.service';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [
    AdminService,
    PageService,
    MediaService
  ]
})
export class AdminComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService,
              private adminService: AdminService,
              private mediaService: MediaService) { }

  ngOnInit() {
  }

  isLoggedIn(): Boolean {
    return this.adminAuthService.isLoggedIn();
  }

  getUserName(): String {
    return this.adminAuthService.getUserName();
  }

}
