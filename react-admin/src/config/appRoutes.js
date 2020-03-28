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

export const KOM_MESTA = {
  key: 'komMesta',
  title: 'KomMesta',
  url: '/kom-mesto',
  icon: 'cog',
  // role: USER_ROLE_ALL,
  component: 'KomMestaPage',
};

export const KOM_MAIN = {
  key: 'komMain',
  title: 'KomMain',
  url: '/kom-main',
  icon: 'cog',
  // role: USER_ROLE_ALL,
  component: 'KomMainPage',
};

export const MAG_MAIN = {
  key: 'magMain',
  title: 'magMain',
  url: '/mag-main',
  icon: 'cog',
  // role: USER_ROLE_ALL,
  component: 'MagMainPage',
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
export default [ART_GROUPS, ART_MAIN, KOM_MESTA, KOM_MAIN, MAG_MAIN, SETTINGS];
