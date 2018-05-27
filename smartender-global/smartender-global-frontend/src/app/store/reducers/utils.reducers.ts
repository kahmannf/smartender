import { UtilActions } from './../actions/utils.actions';
import { environment } from './../../../environments/environment';


export interface UtilsState {
  projectName: string;
}

export const inititalState: UtilsState = {
  projectName: environment.projectName
};

export function utilsReducer(state: UtilsState = inititalState, action: UtilActions) {

  switch (action.type) {
    default:
      return state;
  }
}
