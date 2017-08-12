import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//components
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTopMenuComponent } from './admin-top-menu/admin-top-menu.component';
import { AdminSideMenuComponent } from './admin-side-menu/admin-side-menu.component';
import { AdminViewAreaComponent } from './admin-view-area/admin-view-area.component';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginFormComponent } from './admin-login-form/admin-login-form.component';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './page/page.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NewPageFormComponent } from './new-page-form/new-page-form.component';
import { FrontendComponent } from './frontend/frontend.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminTopMenuComponent,
    AdminSideMenuComponent,
    AdminViewAreaComponent,
    AdminLoginFormComponent,
    PagesComponent,
    PageComponent,
    AdminHomeComponent,
    NewPageFormComponent,
    FrontendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AdminAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
