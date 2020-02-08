import reduxState from '../reduxState';

const { APP } = reduxState;

// eslint-disable-next-line import/prefer-default-export
export const selectAppRedirectUrl = state => state[APP].redirectUrl;
