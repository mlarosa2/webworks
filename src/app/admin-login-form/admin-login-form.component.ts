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
  private newAccount: boolean = false;
  
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
  }

  model = new AdminUser('', '');

  setCreateAccount(toggle: boolean): void {
    this.newAccount = toggle;
    if (toggle) {
      this.model = new AdminUser('', '', '', '');
    } else {
      this.model = new AdminUser('', '', '');
    }
  }

  onLogin():void { this.adminAuthService.logIn(this.model.username, this.model.password); }

  onSignup():void {
    this.adminAuthService.signUp(this.model).then(resp => {
        this.adminAuthService.logIn(this.model.username, this.model.password);
      },
      err => {
        console.log('signup failed');
      }
    );
  }
}
