export const NS = '@newtash/core';

const reduxState = {
  APP: `${NS}/app`,
  // AUTH: `${NS}/auth`,
  // WHO_AM_I: `${NS}/whoAmI`,
  ERRORS: `${NS}/errors`,
};

export const blacklist = [`${NS}/errors`, `${NS}/app`];

export default reduxState;
