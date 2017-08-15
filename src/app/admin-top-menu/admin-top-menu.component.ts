import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../admin.service';
import { PageService } from '../page.service';
import { MediaService } from '../media.service';
import { CollectionsService } from '../collections.service';

@Component({
  selector: 'app-admin-top-menu',
  templateUrl: './admin-top-menu.component.html',
  styleUrls: ['./admin-top-menu.component.css']
})

export class AdminTopMenuComponent implements OnInit {
  @Input() userName: string;
  
  constructor(private adminService: AdminService,
              private pageService: PageService,
              private mediaService: MediaService,
              private collectionsService: CollectionsService) { }

  ngOnInit() {
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

}
