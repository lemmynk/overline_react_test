import { brandPrimary, gray100 } from './colors';
import fontColor from './fontColors';
import { headerHeight } from './sizes';

export default {
  height: headerHeight,

  bgColor: brandPrimary,

  fontColor: gray100,
  fontSize: '1rem',
  fontWeight: 'normal',

  navItemJustify: 'center',
  navItemMinWidth: '8rem',

  dropboxItemBgColor: gray100,
  dropboxItemFontColor: fontColor.primary,
  dropboxItemFontSize: '1rem',
  dropboxItemFontWeight: 'normal',
  dropboxItemJustify: 'flex-start',
  dropboxItemMinHeight: '2rem',
  dropboxItemMinWidth: '12rem',
};
