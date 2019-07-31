// @flow
import { theme } from '@newtash/react-app-core';
import { footerLinks as links } from './appLinks';

const visible = true;
const withSidebarToggle = true;
const footerBrand = '...footer...';

const navbarConfig = {
  inline: true,
  lineHeight: theme.footer.height,
  paddingRight: theme.size.gutter,
  inlineEndPadding: '0.5rem',
  minSize: '12rem',
  hover: {
    bgColor: theme.footer.bgColor,
  },
  navTitle: {
    minWidth: '12rem',
    align: 'right',
  },
};

export default {
  visible,
  withSidebarToggle,
  footerBrand,
  navbarConfig,
  links,
};
