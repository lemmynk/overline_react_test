import { USER_ROLE_ALL } from '@newtash/react-app-core';
import * as pages from '../../pages';

export const HOME = {
  title: 'Home',
  url: '/',
  icon: 'home',
  role: USER_ROLE_ALL,
  component: pages.DashboardPage,
};

export const ART_MAIN = {
  title: 'ArtMain',
  url: '/art-main',
  icon: 'coffee',
  role: USER_ROLE_ALL,
  component: pages.ArtMainPage,
};

export const ART_GROUP = {
  title: 'ArtGroup',
  url: '/art-group',
  icon: 'coffee',
  role: USER_ROLE_ALL,
  component: pages.ArtGroupPage,
};

export const PRIVACY_POLICY = {
  title: 'PrivacyPolicy',
  url: '/privacy-policy',
  role: USER_ROLE_ALL,
};

export default [ART_MAIN, ART_GROUP, HOME];
