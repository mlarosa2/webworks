import { Component, OnInit } from '@angular/core';
import { AdminUser } from '../admin-user';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    '../css/forms.css',
    './sign-up.component.css'
  ]
})
export class SignUpComponent implements OnInit {
  model = new AdminUser('', '', '', '');
  constructor(private adminAuthService: AdminAuthService) { }

  ngOnInit() {
  }

  onSignup(): void {
    this.adminAuthService.signUp(this.model).then(resp => {
        console.log('user created');
      },
      err => {
        console.log('user creation failed');
      }
    );
  }

}
