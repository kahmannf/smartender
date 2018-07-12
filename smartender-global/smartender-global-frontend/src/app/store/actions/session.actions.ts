import { PageResult } from './../../shared/page-result';
import { Machine } from './../../shared/machine';
import { Session } from './../../shared/session';
import { ServerOperationResult } from './../../shared/server-operation-result';
import { Action } from '@ngrx/store';
import { UserSession } from '../../shared/user-session';
import { User } from '../../shared/user';


export enum SessionActionTypes  {
  LoadUserSessions = '[Session] load user sessions',
  LoadUserSessionsSuccessful = '[Session] load user sessions, successful',
  LoadUserSessionsFailure = '[Session] load user sessions failure',
  SetActiveSession = '[Session] set active session',
  SetActiveSessionSuccessful = '[Session] set active session successful',
  SetActiveSessionFailure = '[Session] set active session failure',
  UpdateSessionMachine = '[Session] update session machine',
  LoadSession = '[Session] load session',
  LoadSessionSuccessful = '[Session] load session, successful',
  LoadSessionFailure = '[Session] load session failure',
  SetDetailSessionUsers = '[Session] set detail session users',
  SearchForUser = '[Session] user search',
  SearchForUserSuccessful = '[Session] user search successful',
  SearchForUserFailure = '[Session] user search failed',
  ActivateSession = '[Session] activate session',
  DeactivateSession = '[Session] deactivate session',
  DeOrActivateSuccessful = '[Session] de- or activate successful',
  DeOrActivateFailure = '[Session] de- or activate failure',
  GetNextSearchPage = '[Session] get next search page',
  GetPreviousSearchPage = '[Session] get previous search page',
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

export class UpdateSessionMachine implements Action {
  readonly type = SessionActionTypes.UpdateSessionMachine;

  constructor(public payload: Machine) {}
}

export class LoadSession implements Action {
  readonly type = SessionActionTypes.LoadSession;

  constructor(public payload: number) {}
}

export class LoadSessionSuccessful implements Action {
  readonly type = SessionActionTypes.LoadSessionSuccessful;

  constructor(public payload: Session) {}
}

export class LoadSessionFailure implements Action {
  readonly type = SessionActionTypes.LoadSessionFailure;

  constructor(public payload: any) {}
}

export class SetDetailSessionUsers implements Action {
  readonly type = SessionActionTypes.SetDetailSessionUsers;

  constructor(public payload: [User, UserSession][]) {}
}

export class SearchForUser implements Action {
  readonly type = SessionActionTypes.SearchForUser;

  constructor(public payload: { searchValue?: string; offset: number; limit: number; }) {}
}

export class SearchForUserSuccessful implements Action {
  readonly type = SessionActionTypes.SearchForUserSuccessful;

  constructor(public payload: PageResult<User>) {}
}

export class SearchForUserFailure implements Action {
  readonly type = SessionActionTypes.SearchForUserFailure;

  constructor(public payload: any) {}
}

export class ActivateSession implements Action {
  readonly type = SessionActionTypes.ActivateSession;

  constructor(public payload: number) {}
}

export class DeactivateSession implements Action {
  readonly type = SessionActionTypes.DeactivateSession;

  constructor(public payload: number) {}
}

export class DeOrActivateSuccessful implements Action {
  readonly type = SessionActionTypes.DeOrActivateSuccessful;

  constructor() {}
}

export class DeOrActivateFailure implements Action {
  readonly type = SessionActionTypes.DeOrActivateFailure;

  constructor(public payload: any) {}
}

export class GetNextSearchPage implements Action {
  readonly type = SessionActionTypes.GetNextSearchPage;

  constructor() {}
}

export class GetPreviousSearchPage implements Action {
  readonly type = SessionActionTypes.GetPreviousSearchPage;

  constructor() {}
}

export type SessionActions =
| LoadUserSessions
| LoadUserSessionsSuccessful
| LoadUserSessionsFailure
| SetActiveSession
| SetActiveSessionSuccessful
| SetActiveSessionFailure
| UpdateSessionMachine
| LoadSession
| LoadSessionSuccessful
| LoadSessionFailure
| SetDetailSessionUsers
| SearchForUser
| SearchForUserSuccessful
| SearchForUserFailure
| ActivateSession
| DeactivateSession
| DeOrActivateSuccessful
| DeOrActivateFailure
| GetNextSearchPage
| GetPreviousSearchPage;
