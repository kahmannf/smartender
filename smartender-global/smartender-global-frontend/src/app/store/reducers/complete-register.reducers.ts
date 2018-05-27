import { FormGroup } from '@angular/forms';
import { User } from './../../shared/user';
import { CompleteRegisterActions, CompleteRegisterActionTypes } from '../actions/complete-register.actions';
import { logger } from '../../shared/logger';
import {
  FormGroupState,
  createFormGroupState,
  formGroupReducer,
  createFormGroupReducerWithUpdate,
  validate,
  AbstractControlState,
  updateGroup,
  cast,
  setErrors,
  setValue,
  reset
} from 'ngrx-forms';
import { required, minLength } from 'ngrx-forms/validation';


export interface CompleteRegisterFormValue {
  nestedPasswords: NestedPasswords;
}

export interface NestedPasswords {
  password: string;
  passwordRepeat: string;

}

const FORM_ID = '[CompleteRegister] Complete Register Form';

const inititalFormsState = createFormGroupState<CompleteRegisterFormValue>(FORM_ID, {
  nestedPasswords: {
    password: '',
    passwordRepeat: ''
  }
});

export interface CompleteRegisterState {
  user: User;
  errorMessage: string;
  completeRegisterForm: FormGroupState<CompleteRegisterFormValue>;
}

const initialState: CompleteRegisterState = {
  user: <User>{ },
  errorMessage: '',
  completeRegisterForm: inititalFormsState
};

const completeRegisterFormReducer = createFormGroupReducerWithUpdate<CompleteRegisterFormValue>(
  {
    nestedPasswords: updateGroup<NestedPasswords>({
      password: validate([required, minLength(6)]),
      passwordRepeat: validate([required])
    })
  }, {
    nestedPasswords: (nested, form) =>
      updateGroup<NestedPasswords>({
        passwordRepeat: passwordRepeat => {
          if (form.controls.nestedPasswords.isDirty &&
            form.controls.nestedPasswords &&
            passwordRepeat &&
            form.controls.nestedPasswords.value.password !== passwordRepeat.value) {
            return setErrors({ passwordRepeat: true }, setValue(passwordRepeat.value, passwordRepeat));
          } else {
            return passwordRepeat;
          }
        }
      })(cast(nested))
  }
);

export function completeRegisterReducer(
  state: CompleteRegisterState = initialState,
  action: CompleteRegisterActions
): CompleteRegisterState {

  const completeRegisterForm = completeRegisterFormReducer(state.completeRegisterForm, action);

  if (completeRegisterForm !== state.completeRegisterForm) {
    state = { ...state, completeRegisterForm };
  }

  switch (action.type) {

    case CompleteRegisterActionTypes.GetUserByRegisterKeySuccessful: {
      return {
        ... state,
        user: action.payload
      };
    }

    case CompleteRegisterActionTypes.AccountActivateFailure: {
      logger.error(action.payload);
      return {
        ...state,
        errorMessage: 'Oops, something went wrong! Please try again later.'
      };
    }

    case CompleteRegisterActionTypes.GetUserByRegisterKeyFailed: {
      logger.error(action.payload);
      return state;
    }

    case CompleteRegisterActionTypes.SubmitForm: {
      return {
        ... state
      };
    }

    case CompleteRegisterActionTypes.AccountActivateSuccessful: {
      return {
        ...state,
        completeRegisterForm: setValue({ nestedPasswords: { password: '', passwordRepeat: '' } }, state.completeRegisterForm),
        errorMessage: ''
      };
    }

    case CompleteRegisterActionTypes.GetUserByRegisterKey:
    default:
      return state;
  }
}
