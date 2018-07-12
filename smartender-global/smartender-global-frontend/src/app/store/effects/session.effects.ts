import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, merge } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, filter, tap } from 'rxjs/operators';
import { SessionService } from './../../shared/session.service';
import {
  LoadUserSessionsFailure,
  LoadUserSessionsSuccessful,
  SessionActionTypes,
  SetActiveSession,
  SetActiveSessionFailure,
  SetActiveSessionSuccessful,
  LoadUserSessions,
  LoadSession,
  LoadSessionSuccessful,
  SetDetailSessionUsers,
  LoadSessionFailure,
  SearchForUser,
  SearchForUserSuccessful,
  SearchForUserFailure,
  DeactivateSession,
  DeOrActivateSuccessful,
  DeOrActivateFailure
} from './../actions/session.actions';
import { UserActionTypes } from '../actions/user.actions';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user';
import { UserSession } from '../../shared/user-session';
import { getUserSearchForm } from '../selectors/session.selectors';

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
    this.actions$.pipe(ofType(SessionActionTypes.DeOrActivateSuccessful)),
  );

  @Effect()
  updateSessionEffect$ = merge(
    this.updateSessionsPipe$.pipe(map(() => new LoadUserSessions())),
    this.updateSessionsPipe$.pipe(
      withLatestFrom(this.store),
      map(([action, store]) => store.session.detailSession),
      filter(detailSession => !!detailSession && !!detailSession.id),
      map(detailSession => new LoadSession(detailSession.id))
    ),
  );

  @Effect()
  loadSession$ = this.actions$.pipe(
    ofType(SessionActionTypes.LoadSession),
    switchMap((action: LoadSession) =>
      this.sessionService.getSessionById(action.payload).pipe(
        map(session => new LoadSessionSuccessful(session)),
        catchError(err => of(new LoadSessionFailure(err)))
      )
    )
  );

  @Effect()
  loadSessionCompleted$ = this.actions$.pipe(
    ofType(SessionActionTypes.LoadSessionSuccessful),
    filter((action: LoadSessionSuccessful) => !!action.payload.members),
    map((action: LoadSessionSuccessful) => action.payload.members.map(user => user.user_id)),
    switchMap(ids => this.userService.getByIdArray(ids).pipe(
      withLatestFrom(this.store),
      map(([users, store]) => {
        const result: [User, UserSession][] = [];
        // tslint:disable-next-line:prefer-const
        for (let res_user of users) {
          if (store.session.detailSession && store.session.detailSession.members) {
            const sessUser = store.session.detailSession.members.find(us => us.user_id === res_user.id);
            result.push([res_user, sessUser]);
          } else {
            // result.push([res_user, undefined]);
          }
        }
        return new SetDetailSessionUsers(result);
      }),
      // Todo: Fix that. Thats wrong and lazy
      catchError(err => of(new LoadSessionFailure(err))),
    )),
  );

  @Effect()
  searchForUser$ = this.actions$.pipe(
    ofType(SessionActionTypes.SearchForUser),
    map((action: SearchForUser) => action.payload),
    withLatestFrom(this.store),
    switchMap(([params, store]) => this.userService.searchFoSession(
        store.session.detailSession.id,
        params.limit,
        params.offset,
        params.searchValue
      ).pipe(
        map(result => new SearchForUserSuccessful(result)),
        catchError(err => of(new SearchForUserFailure(err)))
    ))
  );

  @Effect()
  startUserSearch$ = this.store.pipe(
    select(getUserSearchForm),
    map(form => form.value.searchString),
    withLatestFrom(this.store),
    filter(([searchValue, store]) => searchValue !== store.session.lastSearchValue),
    map(([searchValue, store]) => new SearchForUser({
      searchValue: searchValue,
      offset: 0,
      limit: 10
    })),
  );

  @Effect()
  deactivateSession$ = this.actions$.pipe(
    ofType(SessionActionTypes.DeactivateSession),
    switchMap((action: DeactivateSession) => this.sessionService.deactivateSession(action.payload)
    .pipe(
      map(() => new DeOrActivateSuccessful()),
      catchError(err => of(new DeOrActivateFailure(err)))
    ))
  );

  @Effect()
  activateSession$ = this.actions$.pipe(
    ofType(SessionActionTypes.ActivateSession),
    switchMap((action: DeactivateSession) => this.sessionService.activateSession(action.payload)
    .pipe(
      map(() => new DeOrActivateSuccessful()),
      catchError(err => of(new DeOrActivateFailure(err)))
    ))
  );

  @Effect()
  getNextSearchPage$ = this.actions$.pipe(
    ofType(SessionActionTypes.GetNextSearchPage),
    withLatestFrom(this.store),
    map(([action, store]) => store),
    filter(store => !!store.session.searchResult),
    map(store => new SearchForUser({
      searchValue: store.session.lastSearchValue,
      offset: Number(store.session.searchResult.offset) + 1,
      limit: store.session.searchResult.limit
    })),
  );

  @Effect()
  getPreviousSearchPage$ = this.actions$.pipe(
    ofType(SessionActionTypes.GetPreviousSearchPage),
    withLatestFrom(this.store),
    map(([action, store]) => store),
    filter(store => !!store.session.searchResult),
    map(store => new SearchForUser({
      searchValue: store.session.lastSearchValue,
      offset: Number(store.session.searchResult.offset) - 1,
      limit: store.session.searchResult.limit
    })),
  );

  constructor(
    public actions$: Actions,
    public sessionService: SessionService,
    public userService: UserService,
    private store: Store<State>

  ) { }

}

