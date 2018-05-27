import { Action } from '@ngrx/store';


export enum LoginActionTypes {
  LoginSubmitForm = '[Login] submit form',
  LoginSuccessful = '[Login] successful',
  LoginFailed = '[Login] failed'
}

export class LoginSubmitForm implements Action {
  readonly type = LoginActionTypes.LoginSubmitForm;
}

export class LoginSuccessful implements Action {
  readonly type = LoginActionTypes.LoginSuccessful;
}

export class LoginFailed implements Action {
  readonly type = LoginActionTypes.LoginFailed;

  constructor(public payload: string) {}
}


export type LoginActions =
| LoginSubmitForm
| LoginSuccessful
| LoginFailed;
