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
import { SessionsComponent } from './_modules/sessions/sessions.component';
import { DrinkBrowserComponent } from './_modules/drink-browser/drink-browser.component';
import { DrinkDetailComponent } from './_modules/drink-detail/drink-detail.component';
import { MachinesComponent } from './_modules/machines/machines.component';
import { MachineDetailComponent } from './_modules/machine-detail/machine-detail.component';
import { CreateMachineComponent } from './_modules/create-machine/create-machine.component';
import { SessionDetailComponent } from './_modules/session-detail/session-detail.component';
import { CreateSessionComponent } from './_modules/create-session/create-session.component';
import { ManageDrinksComponent } from './_modules/manage-drinks/manage-drinks.component';
import { ManageIngredientsComponent } from './_modules/manage-ingredients/manage-ingredients.component';
import { EditDrinkComponent } from './_modules/edit-drink/edit-drink.component';
import { EditIngredientComponent } from './_modules/edit-ingredient/edit-ingredient.component';
import { IngredientListComponent } from './_modules/ingredient-list/ingredient-list.component';
import { DrinkListComponent } from './_modules/drink-list/drink-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CompleteRegisterComponent,
    NavbarComponent,
    DashboardComponent,
    SessionsComponent,
    DrinkBrowserComponent,
    DrinkDetailComponent,
    MachinesComponent,
    MachineDetailComponent,
    CreateMachineComponent,
    SessionDetailComponent,
    CreateSessionComponent,
    ManageDrinksComponent,
    ManageIngredientsComponent,
    EditDrinkComponent,
    EditIngredientComponent,
    IngredientListComponent,
    DrinkListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CustomValidators
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
