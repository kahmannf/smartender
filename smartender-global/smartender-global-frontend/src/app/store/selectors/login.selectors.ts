import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../reducers/login.reducers';

export const getLoginState = createFeatureSelector<LoginState>('login');

export const getLoginForm = createSelector(
  getLoginState,
  state => state.loginForm
);

export const getLoginErrorMessage = createSelector(
  getLoginState,
  state => state.errorMessage
);

export const loginEmailControl = createSelector(
  getLoginForm,
  form => form.controls.email
);

export const loginPasswordControl = createSelector(
  getLoginForm,
  form => form.controls.password
);
