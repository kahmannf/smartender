import { logger } from './../../shared/logger';
import { SessionActions, SessionActionTypes } from './../actions/session.actions';
import { UserSession } from '../../shared/user-session';


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
