import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';
import { MediaService } from '../media.service';
import { CollectionsService } from '../collections.service';
import { FormsService } from '../forms.service';
import { AssetService } from '../asset.service';
import { AdminAuthService } from '../admin-auth.service';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-admin-top-menu',
  templateUrl: './admin-top-menu.component.html',
  styleUrls: ['./admin-top-menu.component.css']
})

export class AdminTopMenuComponent implements OnInit {
  @Input() userName: string;
  @HostListener('document:click') closeMenuIfOutside() {
    if (event.srcElement.className.indexOf('create-tab') === -1 
        && event.srcElement.parentElement.className.indexOf('sub-menu') === -1 
        && this.createMenuOpen) {
      this.createMenuOpen = false;
    }
  }
  private createMenuOpen: boolean = false;
  constructor(private adminService: AdminService,
              private pageService: PageService,
              private mediaService: MediaService,
              private collectionsService: CollectionsService,
              private formsService: FormsService,
              private assetService: AssetService,
              private adminAuthService: AdminAuthService,
              private eRef: ElementRef,
              private templateService: TemplateService) { }

  ngOnInit() {
  }
  
  signOut(): void {
    this.adminAuthService.signOut();
  }

  goHome(): void {
    this.adminService.setCurrentView('home');
  }

  newPage(): void {
    this.adminService.setCurrentView('pages')
    this.pageService.setCreatePage();
  }

  newMedia(): void {
    this.adminService.setCurrentView('media');
    this.mediaService.turnOnUploadMode();
    this.mediaService.setFiles();
  }

  newCollection(): void {
    this.adminService.setCurrentView('collections');
    this.collectionsService.setBuildView();
  }

  newForm(): void {
    this.adminService.setCurrentView('forms');
    this.formsService.setBuildView();
  }

  newAsset(): void {
    this.adminService.setCurrentView('assets');
    this.assetService.setCreateAsset();
  }

  newTemplate(): void {
    this.adminService.setCurrentView('templates');
    this.templateService.setCreateTemplate();
  }

  toggleCreateMenu(): void {
    this.createMenuOpen = !this.createMenuOpen;
  }

}
