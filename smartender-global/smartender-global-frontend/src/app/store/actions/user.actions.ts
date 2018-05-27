import { Action } from '@ngrx/store';
import { User } from '../../shared/user';

export enum UserActionTypes {
  LoadCurrentUser = '[User] Load current',
  LoadCurrentUserSuccessful = '[User] Load current successful',
  LoadCurrentUserFailure = '[User] Load current failure',
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


export type UserActions =
| LoadCurrentUser
| LoadCurrentUserSuccessful
| LoadCurrentUserFailure;
