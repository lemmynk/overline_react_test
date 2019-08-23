// @flow
import { headerWebLinks, headerAppLinks } from '../appLinks';
import NavBrand from './NavBrand';
import HeaderAvatar from './HeaderAvatar';

const visible = true;
const withSidebarToggle = true;
const headerBrand = NavBrand;
const headerSearch = null;
const headerAvatar = HeaderAvatar;

export const headerWebConfig = {
  visible,
  // withSidebarToggle,
  headerBrand,
  headerSearch,
  links: headerWebLinks,
};

export const headerAppConfig = {
  visible,
  withSidebarToggle,
  headerBrand,
  headerSearch,
  headerAvatar,
  links: headerAppLinks,
};
