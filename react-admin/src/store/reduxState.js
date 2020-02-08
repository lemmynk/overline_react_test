export const NS = '@newtash/core';

const reduxState = {
  APP: `${NS}/app`,
  APP_CONFIG: `${NS}/appConfig`,
  AUTH: `${NS}/auth`,
  WHO_AM_I: `${NS}/whoAmI`,
  ERRORS: `${NS}/errors`,

  ART_PDV: `${NS}/artPdv`,
  ART_GRUPA: `${NS}/artGrupa`,
};

export const blacklist = [`${NS}/errors`, `${NS}/app`];

export default reduxState;
