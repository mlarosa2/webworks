import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../admin-auth.service';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';
import { MediaService } from '../media.service';
import { CollectionsService } from '../collections.service'; 
import { FormsService } from '../forms.service';
import { AssetService } from '../asset.service';
import { GlobalAssetsService } from '../global-assets.service';
import { DeleteConfirmationOverlayService } from '../delete-confirmation-overlay.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [
    AdminService,
    PageService,
    MediaService,
    CollectionsService,
    FormsService,
    AssetService,
    GlobalAssetsService,
    DeleteConfirmationOverlayService,
    CookieService
  ]
})
export class AdminComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService,
              private deleteConfirmationOverlayService: DeleteConfirmationOverlayService) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.adminAuthService.isLoggedIn();
  }

  getUserName(): string {
    return this.adminAuthService.getUserName();
  }

  showDeleteOverlay(): boolean {
    return this.deleteConfirmationOverlayService.viewOverlay();
  }

  checkingFeAuth(): boolean {
    return this.adminAuthService.cookieAuth();
  }

}
