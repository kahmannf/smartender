import { UserSession } from '../../shared/user-session';
import { logger } from './../../shared/logger';
import { SessionActions, SessionActionTypes } from './../actions/session.actions';
import { stat } from 'fs';


export interface SessionState {
  userSessions: UserSession[];
}

export const initialState: SessionState = {
  userSessions: []
};

export function sessionReducer(state: SessionState = initialState, action: SessionActions) {
  switch (action.type) {

    case SessionActionTypes.LoadUserSessionsSuccessful: {
      return {
        ...state,
        userSessions: action.payload
      };
    }

    case SessionActionTypes.UpdateSessionMachine: {
      const machine = action.payload;

      const cleanedList =  state.userSessions.filter(x => x.machine.id !== machine.id);
      const updateSessions = state.userSessions.filter(x => x.machine.id === machine.id);

      const updatedSessions = [];

      // tslint:disable-next-line:prefer-const
      for (let session of updateSessions) {

        const sess = { ...session, machine };
        updatedSessions.push(sess);
      }

      return {
        ...state,
        userSessions: [...cleanedList, ...updatedSessions]
      };
    }

    case SessionActionTypes.SetActiveSessionFailure:
    case SessionActionTypes.LoadUserSessionsFailure: {
      logger.error(action.payload);
      return state;
    }


    case SessionActionTypes.SetActiveSession:
    case SessionActionTypes.LoadUserSessions:
    default:
      return state;
  }
}
