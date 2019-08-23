// @flow
import { sidebarWebLinks, sidebarAppLinks } from '../appLinks';
import SidebarBrand from './SidebarBrand';

const visible = true;
const sidebarHeading = null;
const dismissStyle = {
  bgColor: 'brandPrimary',
  fontColor: 'gray100',
};
const sidebarBrand = SidebarBrand;

export const sidebarWebConfig = {
  visible: false,
  sidebarHeading,
  dismissStyle,
  sidebarBrand,
  links: sidebarWebLinks,
};

export const sidebarAppConfig = {
  visible,
  sidebarHeading,
  dismissStyle,
  sidebarBrand,
  links: sidebarAppLinks,
};
