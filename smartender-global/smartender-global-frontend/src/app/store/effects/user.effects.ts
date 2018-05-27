import { AuthService } from './../../shared/auth.service';
import { SessionService } from './../../shared/session.service';
import { RouterNavigated } from './../actions/utils.actions';
import { State } from './../reducers/index';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserActionTypes, AcceptInvite } from './../actions/user.actions';
import { UserService } from './../../shared/user.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';
import { of, merge } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { LoadUserSessions } from '../actions/session.actions';
import { LoadUserMachines } from '../actions/machine.actions';

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

  @Effect()
  loadCurrentUserSuccessful$ = merge(
  this.actions$.pipe(ofType(UserActionTypes.LoadCurrentUserSuccessful), map(action => {
    this.router.navigate(['home']);
    return new RouterNavigated();
  })),
  this.actions$.pipe(ofType(UserActionTypes.LoadCurrentUserSuccessful), map(action => new LoadUserSessions())),
  this.actions$.pipe(ofType(UserActionTypes.LoadCurrentUserSuccessful), map(action => new LoadUserMachines())),
  this.actions$.pipe(ofType(UserActionTypes.LoadCurrentUserSuccessful), map(action => new userActions.LoadUserInvites()))
  );

  @Effect()
  loadCurrentUserFailure$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadCurrentUserFailure),
    map(action => {
      this.router.navigate(['login']);
      return new RouterNavigated();
    })
  );

  @Effect()
  loadUserInvites$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUserInvites),
    switchMap(() => this.us.getInvites().pipe(
      map(invites => new userActions.LoadUserInvitesSuccessful(invites)),
      catchError(err => of(new userActions.LoadUserInvitesFailure(err)))
    ))
  );

  updateInvitesPipe$ = merge(
    this.actions$.pipe(ofType(UserActionTypes.InviteHandlingFailure)),
    this.actions$.pipe(ofType(UserActionTypes.InviteHandlingSuccessful))
  );

  @Effect()
  updateInvitesEffect$ = merge(
    this.updateInvitesPipe$.pipe(map(() => new userActions.LoadUserInvites())),
  );

  @Effect()
  acceptInvite$ = this.actions$.pipe(
    ofType(UserActionTypes.AcceptInvite),
    switchMap((action: AcceptInvite) =>
      this.sessionService.acceptInvite(action.payload.session_id).pipe(
        map(result => {
          if (result.success) {
            return new userActions.InviteHandlingSuccessful(result);
          } else {
            return new userActions.InviteHandlingFailure(result);
          }
        }),
        catchError(err => of(new userActions.InviteHandlingFailure(err)))
      )
    )
  );

  @Effect()
  declineInvite$ = this.actions$.pipe(
    ofType(UserActionTypes.AcceptInvite),
    switchMap((action: AcceptInvite) =>
      this.sessionService.declineInvite(action.payload.session_id).pipe(
        map(result => {
          if (result.success) {
            return new userActions.InviteHandlingSuccessful(result);
          } else {
            return new userActions.InviteHandlingFailure(result);
          }
        }),
        catchError(err => of(new userActions.InviteHandlingFailure(err)))
      )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(UserActionTypes.Logout),
    map(() => {
      this.auth.logout();
      this.router.navigate(['/login']);
      return new RouterNavigated();
    })
  );

  constructor(
    private actions$: Actions,
    private us: UserService,
    private sessionService: SessionService,
    private auth: AuthService,
    private router: Router
  ) { }
}
