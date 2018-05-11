import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './shared/auth.service';
import { MockService } from './service-client/mock.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './_modules/home/home.component';
import { LoginComponent } from './_modules/login/login.component';
import { RegisterComponent } from './_modules/register/register.component';
import { CustomValidators } from './custom-validators';
import { CompleteRegisterComponent } from './_modules/complete-register/complete-register.component';
import { NavbarComponent } from './_modules/navbar/navbar.component';
import { DashboardComponent } from './_modules/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CompleteRegisterComponent,
    NavbarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    MockService,
    AuthService,
    AuthGuard,
    CustomValidators
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
