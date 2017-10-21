import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../admin-auth.service';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';
import { MediaService } from '../media.service';
import { CollectionsService } from '../collections.service'; 
import { FormsService } from '../forms.service';
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

  isLoggedIn(): boolean {
    return this.adminAuthService.isLoggedIn();
  }

  getUserName(): string {
    return this.adminAuthService.getUserName();
  }

}
