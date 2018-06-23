import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
import { FormResponseService } from '../form-response.service';
import { MonacoService } from '../monaco.service';
import { TemplateService } from '../template.service';
import { AlertService } from '../alert.service';

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
    CookieService,
    FormResponseService,
    MonacoService,
    TemplateService,
    Title,
    AlertService
  ]
})
export class AdminComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService,
              private deleteConfirmationOverlayService: DeleteConfirmationOverlayService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(window.location.host + ' | Admin');
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
