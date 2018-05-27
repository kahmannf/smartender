import { ServerOperationResult } from './../../shared/server-operation-result';
import { Action } from '@ngrx/store';
import { UserSession } from '../../shared/user-session';


export enum SessionActionTypes  {
  LoadUserSessions = '[Session] load user sessions',
  LoadUserSessionsSuccessful = '[Session] load user sessions, successful',
  LoadUserSessionsFailure = '[Session] load user sessions failure',
  SetActiveSession = '[Session] set active session',
  SetActiveSessionSuccessful = '[Session] set active session successful',
  SetActiveSessionFailure = '[Session] set active session failure',
}


export class LoadUserSessions implements Action {
  readonly type = SessionActionTypes.LoadUserSessions;
}

export class LoadUserSessionsSuccessful implements Action {
  readonly type = SessionActionTypes.LoadUserSessionsSuccessful;

  constructor(public payload: UserSession[]) {}
}

export class LoadUserSessionsFailure implements Action {
  readonly type = SessionActionTypes.LoadUserSessionsFailure;

  constructor(public payload: any) {}
}

export class SetActiveSession implements Action {
  readonly type = SessionActionTypes.SetActiveSession;

  constructor(public payload: UserSession) {}
}

export class SetActiveSessionSuccessful implements Action {
  readonly type = SessionActionTypes.SetActiveSessionSuccessful;

  constructor(public payload: ServerOperationResult) {}
}

export class SetActiveSessionFailure implements Action {
  readonly type = SessionActionTypes.SetActiveSessionFailure;

  constructor(public payload: any) {}
}

export type SessionActions =
| LoadUserSessions
| LoadUserSessionsSuccessful
| LoadUserSessionsFailure
| SetActiveSession
| SetActiveSessionSuccessful
| SetActiveSessionFailure;
