import { Store } from '@ngrx/store';
import { AuthService } from './../../shared/auth.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { CompleteRegisterActionTypes } from '../actions/complete-register.actions';
import { map, switchMap, catchError, filter, withLatestFrom } from 'rxjs/operators';
import * as completeRegisterActions from '../actions/complete-register.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RouterAction, RouterNavigationAction } from '@ngrx/router-store';
import { RouterNavigated } from '../actions/utils.actions';
import { State } from '../reducers';
import { CompleteRegisterState } from '../reducers/complete-register.reducers';
import { reset } from 'ngrx-forms';


@Injectable()
export class CompleteRegisterEffects {

  @Effect()
  getUserByRegisterkey$ = this.actions$.pipe(
    ofType(CompleteRegisterActionTypes.GetUserByRegisterKey),
    map((action: completeRegisterActions.GetUserByRegisterKey) => action.payload),
    switchMap(registerkey => this.us.getByRegisterKey(registerkey).pipe(
      map(user => new completeRegisterActions.GetUserByRegisterKeySuccessful(user)),
      catchError(err => of(new completeRegisterActions.GetUserByRegisterKeyFailed(err)))
    ))
  );

  @Effect()
  getUserByRegisterKeyFailure$ = this.actions$.pipe(
    ofType(CompleteRegisterActionTypes.GetUserByRegisterKeyFailed),
    map(() => {
      this.router.navigate(['/login']);
      return new RouterNavigated();
    })
  );

  @Effect()
  submitForm$ = this.actions$.pipe(
    ofType(CompleteRegisterActionTypes.SubmitForm),
    withLatestFrom(this.store),
    map(([action, store]) => (store.completeRegister)),
    filter((state: CompleteRegisterState) => state.completeRegisterForm.isValid),
    map((state: CompleteRegisterState) => ({
      user: { ...state.user },
      password: state.completeRegisterForm.value.nestedPasswords.password
     })),
    switchMap(data =>
      this.as.activateAccount(data.user, data.password).pipe(
        map(success => {
          if (success) {
            return new completeRegisterActions.AccountActivateSuccessful();
          } else {
            return new completeRegisterActions.AccountActivateFailure('Unknown error: Webservice return false');
          }
        }),
        catchError(err => of(new completeRegisterActions.AccountActivateFailure(err)))
      ))
  );

  @Effect()
  accountActivationSuccessful$ = this.actions$.pipe(
    ofType(CompleteRegisterActionTypes.AccountActivateSuccessful),
    map(() => {
      this.router.navigate(['/login']);
      return new RouterNavigated();
    })
  );


  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private us: UserService,
    private as: AuthService,
    private router: Router
  ) { }
}
