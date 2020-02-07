export const USER_ROLE_ALL = 'all';
export const USER_ROLE_DEVELOPER = 'developer';
export const USER_ROLE_ADMIN = 'admin';
export const USER_ROLE_EDITOR = 'editor';
export const USER_ROLE_USER = 'user';
export const USER_ROLE_DEFAULT = USER_ROLE_ALL;

export const roles = [
  USER_ROLE_DEVELOPER,
  USER_ROLE_ADMIN,
  USER_ROLE_EDITOR,
  USER_ROLE_USER,
  USER_ROLE_ALL,
];

export const hasRoleCheck = (routeRole, userRole) => {
  if (!routeRole || routeRole === USER_ROLE_ALL) {
    return true;
  }

  if (!userRole) {
    return false;
  }

  const routeRoleIndex = roles.indexOf(routeRole);
  const userRoleIndex = roles.indexOf(userRole);

  return !(routeRoleIndex < userRoleIndex);
};
