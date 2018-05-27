import { State } from './../reducers/index';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserActionTypes } from './../actions/user.actions';
import { UserService } from './../../shared/user.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {

  @Effect()
  loadCurrentUser$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadCurrentUser),
    switchMap(() => this.us.getCurrentUser().pipe(
      map(user => new userActions.LoadCurrentUserSuccessful(user)),
      catchError(err => of(new userActions.LoadCurrentUserFailure(err)))
    ))
  );

  constructor(
    private actions$: Actions,
    private us: UserService
  ) { }
}
