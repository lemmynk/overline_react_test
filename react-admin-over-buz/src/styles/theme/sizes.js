// Spacing
export const spacer = '1em';
export const spacer25 = `calc(${spacer} * 0.25)`;
export const spacer50 = `calc(${spacer} * 0.5)`;
export const spacer150 = `calc(${spacer} * 1.5)`;
export const spacer200 = `calc(${spacer} * 2.0)`;
export const spacer300 = `calc(${spacer} * 3.0)`;

// Avoid calculated values
// Especially here
export const gutter = '0.5rem';

// Breakpoints
export const xs = 0;
export const sm = '576px';
export const md = '768px';
export const lg = '992px';
export const xl = '1200px';

// Z Index
export const zIndexDropdown = 1000;
export const zIndexSticky = 1020;
export const zIndexFixed = 1030;
export const zIndexModalBackdrop = 1040;
export const zIndexModal = 1050;
export const zIndexPopover = 1060;
export const zIndexTooltip = 1070;

// Layout sizes
export const headerHeight = '3rem';
export const footerHeight = '2rem';
export const buttonMinWidth = '10rem';

export default {
  // Gutter
  gutter,

  // Layout sizes
  headerHeight,
  footerHeight,
  buttonMinWidth,

  // Spacing
  spacer,
  spacer0: 0,
  spacer25,
  spacer50,
  spacer150,
  spacer200,
  spacer300,

  // Breakpoints
  xs,
  sm,
  md,
  lg,
  xl,

  // Z index
  zIndexDropdown,
  zIndexSticky,
  zIndexFixed,
  zIndexModalBackdrop,
  zIndexModal,
  zIndexPopover,
  zIndexTooltip,
};
