import { createSelector } from 'reselect';
import {
  reduxState,
  hasRoleCheck,
  USER_ROLE_DEFAULT,
  USER_ROLE_DEVELOPER,
} from '../../config';
import { selectHasAuth } from './auth';

const { WHO_AM_I } = reduxState;

export const selectWhoAmI = state => state[WHO_AM_I];
export const selectWhoAmIAvatar = state => state[WHO_AM_I].name;
export const selectWhoAmIRole = state =>
  state[WHO_AM_I] ? state[WHO_AM_I].role : USER_ROLE_DEFAULT;
export const selectAmIDeveloper = createSelector(
  [selectWhoAmIRole],
  role => role === USER_ROLE_DEVELOPER,
);

export const selectWhoAmIName = state =>
  state[WHO_AM_I]
    ? `${state[WHO_AM_I].firstName} ${state[WHO_AM_I].lastName}`
    : null;

const isLinkAllowed = (userRole, link) =>
  link.role ? hasRoleCheck(link.role, userRole) : true;

export const selectFilteredLinksByRole = links =>
  createSelector(
    [selectWhoAmIRole],
    userRole => {
      if (!userRole) {
        return links;
      }
      return links.filter(link => isLinkAllowed(userRole, link));
    },
  );

const selectRouteRole = (state, props) => props.role;

export const selectWhoAmIRbac = createSelector(
  [selectHasAuth, selectRouteRole, selectWhoAmIRole],
  (hasAuth, routeRole, userRole) =>
    hasAuth ? hasRoleCheck(routeRole, userRole) : true,
);
