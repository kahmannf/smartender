import { Action } from '@ngrx/store';


export enum UtilActionTypes {
  RouterNavigated = '[Utils] router navigated',
  SetProjectName= '[Utils] set project-name'
}

export class RouterNavigated implements Action {
  readonly type = UtilActionTypes.RouterNavigated;
}

export class SetProjectName implements Action {
  readonly type = UtilActionTypes.SetProjectName;
}

export type UtilActions =
| RouterNavigated
| SetProjectName;

