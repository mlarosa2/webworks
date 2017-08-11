import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-view-area',
  templateUrl: './admin-view-area.component.html',
  styleUrls: ['./admin-view-area.component.css']
})
export class AdminViewAreaComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  currentView(): String {
    return this.adminService.getCurrentView();
  }
}
