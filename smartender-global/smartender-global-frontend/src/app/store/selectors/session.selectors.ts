import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { SessionState } from '../reducers/session.reducers';
import { filter } from 'rxjs/operators';
import { UserSession } from '../../shared/user-session';


export const getSessionState = createFeatureSelector<SessionState>('session');

export const getUserSessions = createSelector(
  getSessionState,
  state => state.userSessions
);

export const getActiveSession = createSelector(
  getUserSessions,
  sessions => sessions.find(x => !!x.is_user_active_session)
);

export const getActiveSessionMachine = createSelector(
  getActiveSession,
  session => session ? session.machine : undefined
);

export const getDetailSession = createSelector(
  getSessionState,
  state => state.detailSession
);

export const getDetailSessionMembers = createSelector(
  getSessionState,
  state => state.detailedSessionUsers
);

export const getUserSearchForm = createSelector(
  getSessionState,
  state => state.searchForm
);

export const getSearchResult = createSelector(
  getSessionState,
  state => state.searchResult
);

export const getUserSearchString = createSelector(
  getSessionState,
  state => state.lastSearchValue
);
