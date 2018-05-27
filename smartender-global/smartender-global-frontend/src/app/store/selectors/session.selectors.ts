import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SessionState } from '../reducers/session.reducers';


export const getSessionState = createFeatureSelector<SessionState>('session');

export const getUserSessions = createSelector(
  getSessionState,
  state => state.userSessions
);

export const getActiveSession = createSelector(
  getUserSessions,
  sessions => sessions.find(x => !!x.is_user_active_session)
);
