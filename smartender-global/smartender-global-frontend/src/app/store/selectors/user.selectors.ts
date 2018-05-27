import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const getUserState = createFeatureSelector<UserState>('user');


export const getCurrentUser = createSelector(
  getUserState,
  state => state.currentUser
);
