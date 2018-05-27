import { SessionState, sessionReducer } from './session.reducers';
import { LoginState, loginReducer } from './login.reducers';
import { CompleteRegisterState, completeRegisterReducer } from './complete-register.reducers';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UserState, userReducer } from './user.reducer';
import { environment } from '../../../environments/environment';


import { storeFreeze } from 'ngrx-store-freeze';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from '../../shared/utils';
import { UtilsState, utilsReducer } from './utils.reducers';


export interface State {
  completeRegister: CompleteRegisterState;
  login: LoginState;
  session: SessionState;
  user: UserState;
  utils: UtilsState;
  routerReducer: RouterReducerState<RouterStateUrl>;
}


export const reducers: ActionReducerMap<State> = {
  completeRegister: completeRegisterReducer,
  login: loginReducer,
  session: sessionReducer,
  user: userReducer,
  utils: utilsReducer,
  routerReducer: routerReducer,

};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
