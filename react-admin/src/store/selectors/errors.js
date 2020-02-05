import reduxState from '../reduxState';

const { ERRORS } = reduxState;

// eslint-disable-next-line import/prefer-default-export
export const selectAppErrors = state => state[ERRORS];
