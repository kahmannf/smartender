import { MachineActions, MachineActionTypes } from './../actions/machine.actions';
import { Machine } from './../../shared/machine';
import { logger } from '../../shared/logger';


export interface MachineState {
  userMachines: Machine[];
  selectedMachineId: number;
}

export const initialState: MachineState = {
  userMachines: [],
  selectedMachineId: 0,
};

export function machineReducer(state: MachineState = initialState, action: MachineActions) {

  switch (action.type) {

    case MachineActionTypes.SelectMachine: {
      return {
        ...state,
        selectedMachineId: action.payload.id
      };
    }

    case MachineActionTypes.LoadUserMachinesSuccessful: {
      return {
        ... state,
        userMachines: action.payload
      };
    }

    case MachineActionTypes.UpdateMachine: {
      const machine = action.payload;

      const cleanedList = state.userMachines.filter(x => x.id !== machine.id);
      const userMachines = [...cleanedList, machine];

      return {
        ... state,
        userMachines
      };
    }

    case MachineActionTypes.RegisterMachineFailure:
    case MachineActionTypes.LoadUserMachinesFailure: {
      logger.error(action.payload);
      return state;
    }

    case MachineActionTypes.RegisterMachineSuccessful:

    case MachineActionTypes.RegisterMachine:
    case MachineActionTypes.LoadUserMachines:
    default:
      return state;
  }
}
