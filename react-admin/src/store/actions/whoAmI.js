import { NS } from '../reduxState';

export const DO_WHO_AM_I_REQUEST = `${NS}/DO_WHO_AM_I_REQUEST`;
export const SET_WHO_AM_I = `${NS}/SET_WHO_AM_I`;
export const CLEAR_WHO_AM_I = `${NS}/CLEAR_WHO_AM_I`;

export const doWhoAmI = () => ({
  type: DO_WHO_AM_I_REQUEST,
});

export const setWhoAmI = whoAmI => ({
  type: SET_WHO_AM_I,
  payload: whoAmI,
});

export const clearWhoAmI = () => ({
  type: CLEAR_WHO_AM_I,
});
