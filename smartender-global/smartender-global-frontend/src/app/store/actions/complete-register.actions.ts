import { User } from '../../shared/user';
import { FormGroup } from '@angular/forms';
import { Action } from '@ngrx/store';


export enum CompleteRegisterActionTypes {
  GetUserByRegisterKey = '[CompleteRegister] get user by registerkey',
  GetUserByRegisterKeySuccessful = '[CompleteRegister] get user by registerkey successful',
  GetUserByRegisterKeyFailed = '[CompleteRegister] get user by registerkey failed',
  SubmitForm = '[CompleteRegister] submit form',
  AccountActivateSuccessful = '[CompleteRegister] account activate success',
  AccountActivateFailure = '[CompleteREgister] account activate failure',
}

export class GetUserByRegisterKey implements Action {
  readonly type = CompleteRegisterActionTypes.GetUserByRegisterKey;

  constructor(public payload: string) {}
}

export class GetUserByRegisterKeySuccessful implements Action {
  readonly type = CompleteRegisterActionTypes.GetUserByRegisterKeySuccessful;

  constructor(public payload: User) {}
}

export class GetUserByRegisterKeyFailed implements Action {
  readonly type = CompleteRegisterActionTypes.GetUserByRegisterKeyFailed;

  constructor(public payload: any) {}
}

export class SubmitForm implements Action {
  readonly type = CompleteRegisterActionTypes.SubmitForm;

  constructor() { }
}

export class AccountActivateSuccessful implements Action {
  readonly type = CompleteRegisterActionTypes.AccountActivateSuccessful;
}

export class AccountActivateFailure implements Action {
  readonly type = CompleteRegisterActionTypes.AccountActivateFailure;

  constructor(public payload: any) {}
}

export type CompleteRegisterActions =
| GetUserByRegisterKey
| GetUserByRegisterKeySuccessful
| GetUserByRegisterKeyFailed
| SubmitForm
| AccountActivateSuccessful
| AccountActivateFailure;
