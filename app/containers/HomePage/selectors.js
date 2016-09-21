/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectStatus = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('status')
);

const selectSubmitted = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('submitted')
);

const selectError = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('error')
);

const selectIPAddress = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('ipAddress')
);

const selectFullBenefits = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('fullBenefits')
);

export {
  selectHome,
  selectStatus,
  selectSubmitted,
  selectError,
  selectIPAddress,
  selectFullBenefits,
};
