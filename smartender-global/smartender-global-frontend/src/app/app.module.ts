import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgrxFormsModule } from 'ngrx-forms';
import { environment } from '../environments/environment';
import { CompleteRegisterComponent } from './_modules/complete-register/complete-register.component';
import { CreateMachineComponent } from './_modules/create-machine/create-machine.component';
import { CreateSessionComponent } from './_modules/create-session/create-session.component';
import { DashboardComponent } from './_modules/dashboard/dashboard.component';
import { DrinkBrowserComponent } from './_modules/drink-browser/drink-browser.component';
import { DrinkDetailComponent } from './_modules/drink-detail/drink-detail.component';
import { DrinkListComponent } from './_modules/drink-list/drink-list.component';
import { EditDrinkComponent } from './_modules/edit-drink/edit-drink.component';
import { EditIngredientComponent } from './_modules/edit-ingredient/edit-ingredient.component';
import { HomeComponent } from './_modules/home/home.component';
import { IngredientListComponent } from './_modules/ingredient-list/ingredient-list.component';
import { LoginComponent } from './_modules/login/login.component';
import { MachineDetailComponent } from './_modules/machine-detail/machine-detail.component';
import { MachinesComponent } from './_modules/machines/machines.component';
import { ManageDrinksComponent } from './_modules/manage-drinks/manage-drinks.component';
import { ManageIngredientsComponent } from './_modules/manage-ingredients/manage-ingredients.component';
import { NavbarComponent } from './_modules/navbar/navbar.component';
import { RegisterComponent } from './_modules/register/register.component';
import { SessionDetailComponent } from './_modules/session-detail/session-detail.component';
import { SessionsComponent } from './_modules/sessions/sessions.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomValidators } from './custom-validators';
import { CustomRouterStateSerializer } from './shared/utils';
import { CompleteRegisterEffects } from './store/effects/complete-register.effects';
import { UserEffects } from './store/effects/user.effects';
import { reducers, metaReducers } from './store/reducers/index';
import { LoginEffects } from './store/effects/login.effects';




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
    // ReactiveFormsModule,
    NgrxFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([CompleteRegisterEffects, UserEffects, LoginEffects])
  ],
  providers: [
    CustomValidators,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
