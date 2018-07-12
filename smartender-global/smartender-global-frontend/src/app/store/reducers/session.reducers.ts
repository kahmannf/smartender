import { PageResult } from './../../shared/page-result';
import { UserSession } from '../../shared/user-session';
import { logger } from './../../shared/logger';
import { SessionActions, SessionActionTypes } from './../actions/session.actions';
import { Session } from '../../shared/session';
import { User } from '../../shared/user';
import { createFormGroupState, FormGroupState, formGroupReducer } from 'ngrx-forms';

export interface SearchFormValue {
  searchString: string;
}

const FORM_ID = '[Session] Search User Form';

const initialFormState = createFormGroupState<SearchFormValue>(FORM_ID, {
  searchString: ''
});

export interface SessionState {
  userSessions: UserSession[];
  // session for the session-detail.comopnent
  detailSession: Session;
  detailedSessionUsers: [User, UserSession][];
  searchForm: FormGroupState<SearchFormValue>;
  searchResult: PageResult<User>;
  lastSearchValue: string;
}

export const initialState: SessionState = {
  userSessions: [],
  detailSession: <Session>{},
  detailedSessionUsers: [],
  searchForm: initialFormState,
  searchResult: undefined,
  lastSearchValue: '',
};

export function sessionReducer(state: SessionState = initialState, action: SessionActions) {

  const searchForm = formGroupReducer(state.searchForm, action);
  if (searchForm !== state.searchForm) {
    state = { ... state, searchForm };
  }

  switch (action.type) {

    case SessionActionTypes.SearchForUserSuccessful: {
      return {
        ...state,
        searchResult: action.payload
      };
    }

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

    case SessionActionTypes.SearchForUser: {
      return {...state, lastSearchValue: action.payload.searchValue };
    }

    case SessionActionTypes.LoadSessionSuccessful: {
      return {
        ...state,
        detailSession: action.payload
      };
    }

    case SessionActionTypes.SetDetailSessionUsers: {
      return {
        ...state,
        detailedSessionUsers: action.payload
      };
    }

    case SessionActionTypes.DeOrActivateFailure:
    case SessionActionTypes.SearchForUserFailure:
    case SessionActionTypes.LoadSessionFailure:
    case SessionActionTypes.SetActiveSessionFailure:
    case SessionActionTypes.LoadUserSessionsFailure: {
      logger.error(action.payload);
      return state;
    }


    case SessionActionTypes.LoadSession:
    case SessionActionTypes.SetActiveSession:
    case SessionActionTypes.LoadUserSessions:
    default:
      return state;
  }
}
