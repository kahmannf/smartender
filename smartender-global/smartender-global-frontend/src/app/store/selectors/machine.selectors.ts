import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MachineState } from '../reducers/machine.reducers';


export const getMachineState = createFeatureSelector<MachineState>('machine');

export const getUserMachines = createSelector(
  getMachineState,
  state => state.userMachines
);

export const getSelectedMachine = createSelector(
  getMachineState,
  state => state.userMachines.find(x => x.id === state.selectedMachineId)
);
