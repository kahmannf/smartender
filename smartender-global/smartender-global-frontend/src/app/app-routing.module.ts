import { SessionDetailComponent } from './_modules/session-detail/session-detail.component';
import { MachineDetailComponent } from './_modules/machine-detail/machine-detail.component';
import { CreateMachineComponent } from './_modules/create-machine/create-machine.component';
import { MachinesComponent } from './_modules/machines/machines.component';
import { DrinkDetailComponent } from './_modules/drink-detail/drink-detail.component';
import { DrinkBrowserComponent } from './_modules/drink-browser/drink-browser.component';
import { SessionsComponent } from './_modules/sessions/sessions.component';
import { DashboardComponent } from './_modules/dashboard/dashboard.component';
import { CompleteRegisterComponent } from './_modules/complete-register/complete-register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './_modules/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_modules/login/login.component';
import { RegisterComponent } from './_modules/register/register.component';
import { CreateSessionComponent } from './_modules/create-session/create-session.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'drinks', component: DrinkBrowserComponent},
      { path: 'drink/:id', component: DrinkDetailComponent},
      { path: 'machines', component: MachinesComponent, children: [
        { path: 'new', component: CreateMachineComponent},
        { path: 'machine/:id', component: MachineDetailComponent}
      ]},
      { path: 'sessions', component: SessionsComponent, children: [
        { path: 'new', component: CreateSessionComponent},
        { path: 'session/:id', component: SessionDetailComponent}
      ]},
      { path: '**', redirectTo: 'dashboard' }
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'complete-register/:registerkey', component: CompleteRegisterComponent },
  { path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
