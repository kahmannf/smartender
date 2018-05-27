import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, merge } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SessionService } from './../../shared/session.service';
import { LoadUserSessionsFailure,
  LoadUserSessionsSuccessful,
  SessionActionTypes,
  SetActiveSession,
  SetActiveSessionFailure,
  SetActiveSessionSuccessful,
  LoadUserSessions
} from './../actions/session.actions';
import { UserActionTypes } from '../actions/user.actions';

@Injectable()
export class SessionEffects {

  @Effect()
  loadUserSession$ = this.actions$.pipe(
    ofType(SessionActionTypes.LoadUserSessions),
    switchMap(action => this.sessionService.getMySessions().pipe(
      map(sessions => new LoadUserSessionsSuccessful(sessions)),
      catchError(err => of(new LoadUserSessionsFailure(err)))
    ))
  );

  @Effect()
  setActiveSession$ = this.actions$.pipe(
    ofType(SessionActionTypes.SetActiveSession),
    switchMap((action: SetActiveSession) =>
    this.sessionService.setActiveSession(action.payload.session_id).pipe(
      map(result => {
        if (result.success) {
          return new SetActiveSessionSuccessful(result);
        } else {
          return new SetActiveSessionFailure(result);
        }
      }),
      catchError(err => of(new SetActiveSessionFailure(err)))
    ))
  );

  updateSessionsPipe$ = merge(
    this.actions$.pipe(ofType(UserActionTypes.InviteHandlingSuccessful)),
    this.actions$.pipe(ofType(SessionActionTypes.SetActiveSessionSuccessful)),
    this.actions$.pipe(ofType(SessionActionTypes.SetActiveSessionFailure)),
  );

  @Effect()
  updateSessionEffect$ = merge(
    this.updateSessionsPipe$.pipe(map(() => new LoadUserSessions()))
  );

  constructor(
    public actions$: Actions,
    public sessionService: SessionService
  ) {}

}

