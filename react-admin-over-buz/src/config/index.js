export * from './appLinks';
export { default as authConfig } from './auth';
export { default as headerConfig } from './header';
export { default as sidebarConfig } from './sidebar';
export { default as footerConfig } from './footer';

export const CRUD_URL_VIEW = 'view';
export const CRUD_URL_EDIT = 'edit';
export const CRUD_URL_CREATE = 'create';

export const SELECTED_TAB_DATA = 'data';
export const SELECTED_TAB_DESC = 'descriptions';

export const CNG_TYPE_STATION = 'cng-station';
export const CNG_TYPE_SERVICE = 'cng-service';

export const cngTypeTitle = cngType =>
  cngType === CNG_TYPE_SERVICE ? 'Service' : 'Station';

export const MEDIA_LINK_CATEGORY_MEDIA = 1;
