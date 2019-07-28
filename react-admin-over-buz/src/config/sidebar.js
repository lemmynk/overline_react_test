// @flow
import { theme } from '@newtash/react-app-core';
import { sidebarLinks as links } from './appLinks';

const visible = true;
const sidebarHeading = null;
const dismissStyle = {
  bgColor: 'brandPrimary',
  fontColor: 'gray100',
};
const navbarConfig = {
  inline: false,
  lineHeight: '3rem',

  hover: {
    bgColor: theme.sidebar.bgColor,
    fontColor: theme.sidebar.fontColor,
    marginRight: theme.size.spacer25,
    borderRadiusRight: theme.size.spacer200,
  },
  navTitle: {
    iconWidth: '2rem',
    leftCaretWidth: '1rem',
  },
  dropdownTitle: {
    iconWidth: '2rem',
    leftCaretWidth: '1rem',
  },
  dropbox: {
    inline: false,
    lineHeight: '2.5rem',

    bgColor: theme.sidebar.bgColor,
    fontColor: theme.sidebar.fontColor,
    fontSize: theme.sidebar.fontSize,
    fontWeight: theme.sidebar.fontWeight,

    hover: {
      bgColor: theme.sidebar.bgColor,
      fontColor: theme.sidebar.fontColor,
      marginRight: theme.size.spacer25,
      borderRadiusRight: theme.size.spacer200,
    },
    navTitle: {
      iconWidth: '2rem',
      leftCaretWidth: '1.5rem',
    },
  },
};

export default {
  visible,
  sidebarHeading,
  dismissStyle,
  navbarConfig,
  links,
};
