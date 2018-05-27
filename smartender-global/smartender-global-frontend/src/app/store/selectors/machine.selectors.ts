import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MachineState } from '../reducers/machine.reducers';


export const getMachineState = createFeatureSelector<MachineState>('machine');

export const getUserMachines = createSelector(
  getMachineState,
  state => state.userMachines
);

