/**
 * Match linkStyle values with ones defined in style/theme/navbar
 */
// @flow
import { theme } from '@newtash/react-app-core';
import { headerLinks as links } from './appLinks';
import NavBrand from '../components/NavBrand';

const visible = true;
const withSidebarToggle = true;
const headerBrand = NavBrand;
const headerSearch = null;

const navbarConfig = {
  inline: true,
  lineHeight: theme.header.height,
  paddingRight: theme.size.gutter,
  hover: {
    bgColor: theme.header.bgColor,
  },
  navTitle: {
    wrapperPadding: theme.size.spacer25,
    minWidth: '8rem',
    align: 'center',
  },
  dropdownTitle: {
    rightCaret: 'caret-down',
  },
  dropbox: {
    inline: true,
    lineHeight: '2rem',
    border: `1px solid ${theme.color.gray900}`,

    bgColor: theme.header.dropboxItemBgColor,
    fontColor: theme.header.dropboxItemFontColor,
    fontSize: theme.header.dropboxItemFontSize,
    fontWeight: theme.header.dropboxItemFontWeight,
    hover: {
      bgColor: theme.header.dropboxItemBgColor,
      fontColor: theme.header.dropboxItemFontColor,
    },
    navTitle: {
      align: 'left',
      iconWidth: '2rem',
      minWidth: '4rem',
      caretWidth: '2rem',
    },
  },
};

export default {
  visible,
  withSidebarToggle,
  headerBrand,
  headerSearch,
  navbarConfig,
  links,
};
