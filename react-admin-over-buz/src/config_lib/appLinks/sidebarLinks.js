import { USER_ROLE_ALL } from '@newtash/react-app-core';
import { HOME, LOGOUT, ARTIKLI } from './appRoutes';

export default [
  {
    title: 'Home',
    url: HOME,
    icon: 'home',
    role: USER_ROLE_ALL,
  },
  {
    title: 'Artikli',
    url: ARTIKLI,
    icon: 'coffee',
    role: USER_ROLE_ALL,
  },
  {
    title: 'Logout',
    url: LOGOUT,
    icon: 'sign-out-alt',
  },
];
