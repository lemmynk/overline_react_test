export const NS = '@newtash/core';

const reduxState = {
  APP: `${NS}/app`,
  APP_CONFIG: `${NS}/appConfig`,
  AUTH: `${NS}/auth`,
  WHO_AM_I: `${NS}/whoAmI`,
  ERRORS: `${NS}/errors`,

  FORM: `${NS}/form`,
  ART_PDV: `${NS}/artPdv`,
  ART_GRUPA: `${NS}/artGrupa`,
};

// export const blacklist = [`${NS}/errors`, `${NS}/app`, `${NS}/form`];
export const blacklist = [reduxState.ERRORS, reduxState.APP, reduxState.FORM];

export default reduxState;
