import { Component, OnInit } from '@angular/core';
import { AdminUser } from '../admin-user';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-admin-login-form',
  templateUrl: './admin-login-form.component.html',
  styleUrls: [
    '../css/forms.css',
    './admin-login-form.component.css'
  ]
})
export class AdminLoginFormComponent implements OnInit {
  model = new AdminUser('', '');
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
  }

  onLogin(): void { this.adminAuthService.logIn(this.model.username, this.model.password); }
}
