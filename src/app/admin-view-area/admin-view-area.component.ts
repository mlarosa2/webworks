import { Component, OnInit, HostListener } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-view-area',
  templateUrl: './admin-view-area.component.html',
  styleUrls: ['./admin-view-area.component.css']
})
export class AdminViewAreaComponent implements OnInit {
  @HostListener('click') closeModal() {
    if (!this.adminService.getCurrentModalView()) {
      this.adminService.setModalView(false);
    }
  }
  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  currentView(): string {
    return this.adminService.getCurrentView();
  }

  currentModalView(): string | boolean {
    return this.adminService.getCurrentModalView();
  }
}
