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
  title: 'Artikli',
  url: '/art-main',
  icon: 'coffee',
  role: USER_ROLE_ALL,
  component: pages.ArtikliPage,
};

export const PRIVACY_POLICY = {
  title: 'PrivacyPolicy',
  url: '/privacy-policy',
  role: USER_ROLE_ALL,
};

export default [ART_MAIN, HOME];
