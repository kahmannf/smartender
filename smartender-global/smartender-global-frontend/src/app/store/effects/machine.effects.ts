import { MachineActionTypes } from './../actions/machine.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../shared/user.service';
import * as machineActions from '../actions/machine.actions';
import { of } from 'rxjs';
import { UpdateSessionMachine } from '../actions/session.actions';

@Injectable()
export class MachineEffects {

  @Effect()
  loadUserMachines$ = this.actions$.pipe(
    ofType(MachineActionTypes.LoadUserMachines),
    switchMap(action => this.us.getMyMachines().pipe(
      map(machines => new machineActions.LoadUserMachinesSuccessful(machines)),
      catchError(err => of(new machineActions.LoadUserMachinesFailure(err)))
    ))
  );

  @Effect()
  updateMachine$ = this.actions$.pipe(
    ofType(MachineActionTypes.UpdateMachine),
    map((action: machineActions.UpdateMachine) => new UpdateSessionMachine(action.payload))
  );


  constructor(
    private actions$: Actions,
    private us: UserService
  ) {}
}
