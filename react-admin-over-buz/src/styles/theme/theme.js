// Brand Colors
export const brandPrimary = '#2874a6';
export const blue = '#0e7bdf';
export const indigo = '#6610f2';
export const purple = '#6f42c1';
export const pink = '#e83e8c';
export const red = '#dc3545';
export const maroon = '#800000';
export const orange = '#fd7e14';
export const yellow = '#ffc107';
export const green = '#28a745';
export const teal = '#20c997';
export const cyan = '#17a2b8';
export const white = '#fff';
export const gray100 = '#f8f9fa';
export const gray200 = '#e9ecef';
export const gray300 = '#dee2e6';
export const gray400 = '#ced4da';
export const gray500 = '#adb5bd';
export const gray600 = '#868e96';
export const gray700 = '#495057';
export const gray800 = '#343a40';
export const gray900 = '#212529';
export const black = '#000';
// Spacing
export const spacer = '1rem';
// Z Index
export const zIndexDropdown = 1000;
export const zIndexSticky = 1020;
export const zIndexFixed = 1030;
export const zIndexModalBackdrop = 1040;
export const zIndexModal = 1050;
export const zIndexPopover = 1060;
export const zIndexTooltip = 1070;

export default {
  // LAYOUT COLORS
  bgPrimary: white,
  headerBg: brandPrimary,
  headerColor: gray100,
  sidebarBg: brandPrimary,
  sidebarColor: gray100,
  sidebarAccordionBg: gray200,
  sidebarAccordionColor: gray900,
  footerBg: gray800,
  footerColor: white,

  // THEME COLORS
  themePrimary: blue,
  themeSecondary: gray600,
  themeSuccess: green,
  themeInfo: cyan,
  themeWarning: yellow,
  themeDanger: red,
  themeLight: gray100,
  themeDark: gray800,

  textPrimary: gray800,

  // COLORS
  blue,
  indigo,
  purple,
  pink,
  red,
  maroon,
  orange,
  yellow,
  green,
  teal,
  cyan,
  white,
  gray: gray600,
  grayDark: gray800,
  graySeparator: gray400,
  black,

  themeColorInterval: '8%',

  // Spacing
  spacer,
  spacer0: 0,
  spacer25: `calc(${spacer} * 0.25)`,
  spacer50: `calc(${spacer} * 0.5)`,
  spacer150: `calc(${spacer} * 1.5)`,
  spacer200: `calc(${spacer} * 2.0)`,
  spacer300: `calc(${spacer} * 3.0)`,

  // Body
  bodyBg: white,
  bodyColor: gray900,

  // Links
  linkColor: blue,
  linkDecoration: 'none',
  linkHoverDecoration: 'underline',

  // Grid
  xs: 0,
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',

  // Dimensions
  headerFontSize: '1rem',
  // headerFontWeight: 'normal',
  headerHeight: '3rem',
  headerNavitemMinWidth: '8rem',

  sidebarFontSize: '1rem',
  // sidebarFontWeight: 'normal',
  sidebarWidth: '360px',
  sidebarWidthXs: '250px',
  sidebarItemHeight: '4.5rem',
  sidebarItemIconWrapperWidth: '3rem',
  sidebarDismissButtonSize: '35px',

  footerFontSize: '0.75rem',
  footerFontWeight: '100',
  footerHeight: '2rem',
  footerNavitemMinWidth: '12rem',

  // Z index
  zIndexDropdown,
  zIndexSticky,
  zIndexFixed,
  zIndexModalBackdrop,
  zIndexModal,
  zIndexPopover,
  zIndexTooltip,
};
