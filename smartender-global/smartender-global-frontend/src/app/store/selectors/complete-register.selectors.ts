import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompleteRegisterState } from '../reducers/complete-register.reducers';

export const getCompleteRegisterState = createFeatureSelector<CompleteRegisterState>('completeRegister');


export const getUser = createSelector(
  getCompleteRegisterState,
  state => state.user
);

export const getErrorMessage = createSelector(
  getCompleteRegisterState,
  state => state.errorMessage
);

export const completeRegisterFormState = createSelector(
  getCompleteRegisterState,
  state => state.completeRegisterForm
);

export const controlPassword = createSelector(
  completeRegisterFormState,
  form => {
    const temp = <any>form.controls.nestedPasswords;
    return temp.controls.password;
  }
);

export const controlPasswordRepeat = createSelector(
  completeRegisterFormState,
  form => {
    const temp = <any>form.controls.nestedPasswords;
    return temp.controls.passwordRepeat;
  }
);

