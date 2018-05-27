import { User } from '../../shared/user';
import { UserActions, UserActionTypes } from '../actions/user.actions';
import { logger } from '../../shared/logger';


export interface UserState {
  currentUser: User;
}

const initialState: UserState = {
  currentUser: undefined,
};

export function userReducer(state: UserState = initialState, action: UserActions): UserState {

  switch (action.type) {

    case UserActionTypes.LoadCurrentUserSuccessful: {
      return {
        ...state,
        currentUser: action.payload
      };
    }

    case UserActionTypes.LoadCurrentUserFailure: {
      logger.error(action.payload);
      return state;
    }

    case UserActionTypes.LoadCurrentUser:
    default: {
      return state;
    }
  }
}
