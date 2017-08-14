import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../admin-auth.service';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';
import { MediaService } from '../media.service';
import { CollectionsService } from '../collections.service'; 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [
    AdminService,
    PageService,
    MediaService,
    CollectionsService
  ]
})
export class AdminComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
  }

  isLoggedIn(): Boolean {
    return this.adminAuthService.isLoggedIn();
  }

  getUserName(): String {
    return this.adminAuthService.getUserName();
  }

}
