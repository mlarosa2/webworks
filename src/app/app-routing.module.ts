import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { FrontendComponent } from './frontend/frontend.component';

const appRoutes: Routes = [
  {
    path: '',
    component: FrontendComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '**',
    component: FrontendComponent
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
