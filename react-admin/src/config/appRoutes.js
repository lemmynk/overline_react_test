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

export const LOGOUT = {
  key: 'logout',
  title: 'Log Out',
  url: LOGOUT_PAGE_PATH,
  icon: 'gavel',
  // role: USER_ROLE_ALL,
  // component: 'LogoutPage',
};

// List of routes to load by router
export default [];
