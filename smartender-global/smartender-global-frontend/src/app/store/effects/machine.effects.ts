import { MachineActionTypes } from './../actions/machine.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { UserService } from '../../shared/user.service';
import * as machineActions from '../actions/machine.actions';
import { of } from 'rxjs';
import { UpdateSessionMachine } from '../actions/session.actions';
import { Store } from '@ngrx/store';
import { State } from '../reducers';

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

  @Effect()
  registerMachine$ = this.actions$.pipe(
    ofType(MachineActionTypes.RegisterMachine),
    withLatestFrom(this.store),
    map(([action, state]) => state.machine.createMachineState.createMachineForm),
    filter(form => form.isValid),
    switchMap(form => this.us.registerMachine(form.value.machinekey, form.value.name).pipe(
      map(result => {
        if (result && result.success) {
          return new machineActions.RegisterMachineSuccessful();
        } else {
          return new machineActions.RegisterMachineFailure(result);
        }
      }),
      catchError(err => of(new machineActions.RegisterMachineFailure(err)))
    ))
  );

  @Effect()
  registerMachineSuccessful$ = this.actions$.pipe(
    ofType(MachineActionTypes.RegisterMachineSuccessful),
    map(() => new machineActions.LoadUserMachines())
  );

  constructor(
    private actions$: Actions,
    private us: UserService,
    private store: Store<State>
  ) {}
}
