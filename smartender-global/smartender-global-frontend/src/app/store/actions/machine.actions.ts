import { Action } from '@ngrx/store';
import { Machine } from '../../shared/machine';

export enum MachineActionTypes {
  LoadUserMachines = '[Machine] load user machines',
  LoadUserMachinesSuccessful = '[Machine] load usre machines successful',
  LoadUserMachinesFailure = '[Machine] load usre machines failure',
  RegisterMachine = '[Machine] register machine',
  RegisterMachineSuccessful = '[Machine] register machine successful',
  RegisterMachineFailure = '[Machine] register machine failure',
  UpdateMachine = '[Machine] update machine',
}

export class LoadUserMachines implements Action {
  readonly type = MachineActionTypes.LoadUserMachines;
}

export class LoadUserMachinesSuccessful implements Action {
  readonly type = MachineActionTypes.LoadUserMachinesSuccessful;

  constructor(public payload: Machine[]) {}
}

export class LoadUserMachinesFailure implements Action {
  readonly type = MachineActionTypes.LoadUserMachinesFailure;

  constructor(public payload: any) {}
}

export class RegisterMachine implements Action {
  readonly type = MachineActionTypes.RegisterMachine;

  constructor() {}
}

export class RegisterMachineSuccessful implements Action {
  readonly type = MachineActionTypes.RegisterMachineSuccessful;
}

export class RegisterMachineFailure implements Action {
  readonly type = MachineActionTypes.RegisterMachineFailure;

  constructor(public payload: any) {}
}

export class UpdateMachine implements Action {
  readonly type = MachineActionTypes.UpdateMachine;

  constructor(public payload: Machine) {}
}


export type MachineActions =
| LoadUserMachines
| LoadUserMachinesSuccessful
| LoadUserMachinesFailure
| RegisterMachine
| RegisterMachineSuccessful
| RegisterMachineFailure
| UpdateMachine;
