import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
