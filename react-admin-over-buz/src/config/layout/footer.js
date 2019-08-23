// @flow
import { footerWebLinks, footerAppLinks } from '../appLinks';
import FooterBrand from './FooterBrand';

const visible = true;
const withSidebarToggle = true;
const footerBrand = FooterBrand;

export const footerWebConfig = {
  visible,
  withSidebarToggle,
  footerBrand,
  links: footerWebLinks,
};

export const footerAppConfig = {
  visible,
  withSidebarToggle,
  footerBrand,
  links: footerAppLinks,
};
