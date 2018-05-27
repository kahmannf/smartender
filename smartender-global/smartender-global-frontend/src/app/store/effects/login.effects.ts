import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../shared/auth.service';
import { LoginActionTypes, LoginFailed, LoginSuccessful } from '../actions/login.actions';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { withLatestFrom, map, catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterNavigated } from '../actions/utils.actions';

@Injectable()
export class LoginEffects {

  @Effect()
  loginSubmitForm$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginSubmitForm),
    withLatestFrom(this.store),
    map(([action, state]) => state.login),
    switchMap(loginState => {
      if (loginState.loginForm.isInvalid) {
        return of(new LoginFailed(''));
      } else {
        return this.auth.login(
          loginState.loginForm.value.email,
          loginState.loginForm.value.password
        ).pipe(
          map(result => {
            if (result) {
              return new LoginSuccessful();
            } else {
              return new LoginFailed('Ooppps, Seems like something went wrong! Please try again later.');
            }
          }),
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                return of(new LoginFailed('Invalid email/password combination!'));
              } else {
                return of(new LoginFailed('Ooppps, Seems like something went wrong! Please try again later.'));
              }
            } else {
              return of(new LoginFailed('Ooppps, Seems like something went wrong! Please try again later.'));
            }
          })
        );
      }
    })
  );

  @Effect()
  loginSuccessful$ = this.actions$.pipe(
    ofType(LoginActionTypes.LoginSuccessful),
    map(() => {
        this.router.navigate(['/home']);
        return new RouterNavigated();
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private auth: AuthService,
    private router: Router
  ) { }
}
