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
