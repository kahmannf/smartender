import { Action } from '@ngrx/store';
import { User } from '../../shared/user';
import { Invitation } from '../../shared/invitation';
import { ServerOperationResult } from '../../shared/server-operation-result';

export enum UserActionTypes {
  LoadCurrentUser = '[User] Load current',
  LoadCurrentUserSuccessful = '[User] Load current successful',
  LoadCurrentUserFailure = '[User] Load current failure',
  LoadUserInvites = '[User] load user invites',
  LoadUserInvitesSuccessful = '[User] load user invites successful',
  LoadUserInvitesFailure = '[User] load user invites failure',
  AcceptInvite = '[User] accept invite',
  DeclineInvite = '[User] decline invite',
  InviteHandlingSuccessful = '[User] invite handling successful',
  InviteHandlingFailure = '[User] invite handling failure',
  Logout = '[User] Logout',
}

export class LoadCurrentUser implements Action {
  readonly type =  UserActionTypes.LoadCurrentUser;
}

export class LoadCurrentUserSuccessful implements Action {
  readonly type =  UserActionTypes.LoadCurrentUserSuccessful;
  constructor(public payload: User) {}
}

export class LoadCurrentUserFailure implements Action {
  readonly type =  UserActionTypes.LoadCurrentUserFailure;
  constructor(public payload: any) {}
}

export class LoadUserInvites implements Action {
  readonly type = UserActionTypes.LoadUserInvites;
}

export class LoadUserInvitesSuccessful implements Action {
  readonly type = UserActionTypes.LoadUserInvitesSuccessful;

  constructor(public payload: Invitation[]) {}
}

export class LoadUserInvitesFailure implements Action {
  readonly type = UserActionTypes.LoadUserInvitesFailure;

  constructor(public payload: any) {}
}

export class AcceptInvite implements Action {
  readonly type = UserActionTypes.AcceptInvite;

  constructor(public payload: Invitation) {}
}

export class DeclineInvite implements Action {
  readonly type = UserActionTypes.DeclineInvite;

  constructor(public payload: Invitation) {}
}

export class InviteHandlingSuccessful implements Action {
  readonly type = UserActionTypes.InviteHandlingSuccessful;

  constructor(public payload: ServerOperationResult) {}
}

export class InviteHandlingFailure implements Action {
  readonly type = UserActionTypes.InviteHandlingFailure;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = UserActionTypes.Logout;
}

export type UserActions =
| LoadCurrentUser
| LoadCurrentUserSuccessful
| LoadCurrentUserFailure
| LoadUserInvites
| LoadUserInvitesSuccessful
| LoadUserInvitesFailure
| AcceptInvite
| DeclineInvite
| InviteHandlingSuccessful
| InviteHandlingFailure
| Logout;
