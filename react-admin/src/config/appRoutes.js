// import { USER_ROLE_ALL, LOGIN_PAGE_PATH } from '../../lib';
import { LOGOUT_PAGE_PATH } from './auth';

export const HOME = {
  key: 'home',
  title: 'Home',
  url: '/',
  icon: 'home',
  // role: USER_ROLE_ALL,
  component: 'HomePage',
};

export const ART_GROUPS = {
  key: 'artGroups',
  title: 'ArtGroups',
  url: '/art-groups',
  icon: 'cog',
  // role: USER_ROLE_ALL,
  component: 'ArtGroupsPage',
};

export const ART_MAIN = {
  key: 'artMain',
  title: 'ArtMain',
  url: '/art-main',
  icon: 'cog',
  // role: USER_ROLE_ALL,
  component: 'ArtMainPage',
};

export const SETTINGS = {
  key: 'settings',
  title: 'Settings',
  url: '/settings',
  icon: 'cog',
  // role: USER_ROLE_ALL,
  component: 'SettingsPage',
};

export const LOGOUT = {
  key: 'logout',
  title: 'LogOut',
  url: LOGOUT_PAGE_PATH,
  icon: 'sign-out-alt',
  // role: USER_ROLE_ALL,
  // component: 'LogoutPage',
};

// List of routes to load by router
export default [ART_GROUPS, ART_MAIN, SETTINGS];
