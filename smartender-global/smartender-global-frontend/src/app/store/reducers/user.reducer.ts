import { User } from '../../shared/user';
import { UserActions, UserActionTypes } from '../actions/user.actions';
import { logger } from '../../shared/logger';
import { Invitation } from '../../shared/invitation';


export interface UserState {
  currentUser: User;
  invites: Invitation[];
}

const initialState: UserState = {
  currentUser: <User>{},
  invites: [],
};

export function userReducer(state: UserState = initialState, action: UserActions): UserState {

  switch (action.type) {

    case UserActionTypes.LoadCurrentUserSuccessful: {
      return {
        ...state,
        currentUser: action.payload
      };
    }

    case UserActionTypes.LoadUserInvitesSuccessful: {
      return {
        ...state,
        invites: action.payload
      };
    }

    case UserActionTypes.InviteHandlingFailure:
    case UserActionTypes.LoadUserInvitesFailure:
    case UserActionTypes.LoadCurrentUserFailure: {
      logger.error(action.payload);
      return state;
    }

    case UserActionTypes.LoadUserInvites:
    case UserActionTypes.LoadCurrentUser:
    default: {
      return state;
    }
  }
}
