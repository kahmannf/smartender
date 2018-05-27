import { UtilsState } from './../reducers/utils.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';



export const getUtilsState = createFeatureSelector<UtilsState>('utils');


export const getProjectName = createSelector(
  getUtilsState,
  state => state.projectName
);
