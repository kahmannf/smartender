import { MachineActions, MachineActionTypes } from './../actions/machine.actions';
import { Machine } from './../../shared/machine';
import { logger } from '../../shared/logger';
import { createFormGroupState, FormGroupState, formGroupReducer, updateGroup, validate, reset, setValue } from 'ngrx-forms';
import { required, minLength, maxLength } from 'ngrx-forms/validation';


export interface CreateMachineFormValue {
  machinekey: string;
  name: string;
}

const FORM_ID = '[Machine] create machine form';

export const initialCreateMachineFormState = createFormGroupState<CreateMachineFormValue>(FORM_ID, {
  machinekey: '',
  name: ''
});

export interface CreateMachieState {
  createMachineForm: FormGroupState<CreateMachineFormValue>;
  errorMessage: string;
}

export interface MachineState {
  createMachineState: CreateMachieState;
  userMachines: Machine[];
  selectedMachineId: number;
}

export const initialState: MachineState = {
  createMachineState: {
    createMachineForm: initialCreateMachineFormState,
    errorMessage: ''
  },
  userMachines: [],
  selectedMachineId: 0,
};

const createFromReducer = updateGroup<CreateMachineFormValue>({
  machinekey: validate<string>([required, minLength(10), maxLength(10)]),
  name: validate<string>(required)
});

export function machineReducer(state: MachineState = initialState, action: MachineActions) {
  const createMachineForm = formGroupReducer(state.createMachineState.createMachineForm, action);

  if (createMachineForm !== state.createMachineState.createMachineForm) {
    state = {
      ... state,
      createMachineState: {
        ... state.createMachineState,
        createMachineForm
      }
    };
  }

  const createMachineForm2 = createFromReducer(state.createMachineState.createMachineForm);

  if (createMachineForm2 !== state.createMachineState.createMachineForm) {
    state = {
      ... state,
      createMachineState: {
        ...state.createMachineState,
        createMachineForm: createMachineForm2
      }
    };
  }


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

    case MachineActionTypes.RegisterMachineSuccessful: {
      let createMachineForm3 = setValue({ machinekey: '', name: '' }, state.createMachineState.createMachineForm);
      createMachineForm3 = reset(createMachineForm3);
      console.dir(createMachineForm3);
      return {
        ...state,
        createMachineState: {
          ... state.createMachineState,
          createMachineForm: createMachineForm3
        }
      };
    }

    case MachineActionTypes.RegisterMachine:
    case MachineActionTypes.LoadUserMachines:
    default:
      return state;
  }
}
