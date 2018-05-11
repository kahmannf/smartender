import { DashboardComponent } from './_modules/dashboard/dashboard.component';
import { CompleteRegisterComponent } from './_modules/complete-register/complete-register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './_modules/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_modules/login/login.component';
import { RegisterComponent } from './_modules/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent},
      { path: '**', redirectTo: 'dashboard' }
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'complete-register/:registerkey', component: CompleteRegisterComponent },
  { path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
