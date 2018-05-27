import {
  FormGroupState,
  createFormGroupReducerWithUpdate,
  createFormGroupState,
  formGroupReducer,
  updateGroup,
  validate,
  setValue,
  reset} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { LoginActionTypes, LoginActions } from '../actions/login.actions';



export interface LoginFormValue {
  email: string;
  password: string;
}

const FORM_ID = '[Login] Login Form';

const initialFormState = createFormGroupState<LoginFormValue>(FORM_ID, {
  email: '',
  password: ''
});

export interface LoginState {
  errorMessage: string;
  loginForm: FormGroupState<LoginFormValue>;
}

export const initialState: LoginState = {
  errorMessage: '',
  loginForm: initialFormState
};

const loginFormReducer = updateGroup<LoginFormValue>({
  email: validate<string>(required),
  password: validate<string>(required)
});

export function loginReducer(state: LoginState = initialState, action: LoginActions) {
  const loginForm = formGroupReducer(state.loginForm, action);
  if (loginForm !== state.loginForm) {
    state = { ... state, loginForm };
  }

  const loginForm2 = loginFormReducer(state.loginForm);
  if (loginForm2 !== state.loginForm) {
    state = { ... state, loginForm: loginForm2 };
  }

  switch (action.type) {

    case LoginActionTypes.LoginSuccessful: {
      return {
        ...state,
        errorMessage: '',
        loginForm: reset(setValue({ email: '', password: '' }, state.loginForm))
      };
    }

    case LoginActionTypes.LoginSubmitForm: {
      return {
        ...state,
        errorMessage: ''
      };
    }

    case LoginActionTypes.LoginFailed: {
      return {
        ...state,
        errorMessage: action.payload
      };
    }

    default: return state;
  }
}
