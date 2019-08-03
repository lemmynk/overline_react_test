// @flow
import { sidebarLinks as links } from '../appLinks';
import SidebarBrand from './SidebarBrand';

const visible = true;
const sidebarHeading = null;
const dismissStyle = {
  bgColor: 'brandPrimary',
  fontColor: 'gray100',
};
const sidebarBrand = SidebarBrand;

export default {
  visible,
  sidebarHeading,
  dismissStyle,
  sidebarBrand,
  links,
};
