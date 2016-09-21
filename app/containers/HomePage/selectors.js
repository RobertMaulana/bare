/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectStatus = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('status')
);

const selectData = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('data')
);

const selectSubmitted = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('submitted')
);

const selectError = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('error')
);

export {
  selectHome,
  selectStatus,
  selectData,
  selectSubmitted,
  selectError,
};