import libTheme from '../styles/theme';

export default (appTheme = {}) => {
  const rootTheme = {};
  const keys = Object.keys(libTheme);
  keys.map(key => {
    if (appTheme[key]) {
      rootTheme[key] = { ...libTheme[key], ...appTheme[key] };
    } else {
      rootTheme[key] = libTheme[key];
    }
    return true;
  });

  return rootTheme;
};
