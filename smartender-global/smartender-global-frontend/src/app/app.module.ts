import { AuthService } from './shared/auth.service';
import { MockService } from './service-client/mock.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './_modules/home/home.component';
import { LoginComponent } from './_modules/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    MockService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
