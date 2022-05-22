import { createSelector } from '@reduxjs/toolkit';

import type { AppState } from 'types';

const appSelector = (state: AppState) => state.user;

export const user = createSelector(appSelector, (state) => state.user!);

export const name = createSelector(appSelector, (state) => {
  const user = state.user!;
  return user.name;
});

export const isAuthenticated = createSelector(
  appSelector,
  (state) => state.user != null,
);
