export const DO_WHO_AM_I_REQUEST = '@newtash/react-app/DO_WHO_AM_I_REQUEST';
export const SET_WHO_AM_I = '@newtash/react-app/SET_WHO_AM_I';
export const CLEAR_WHO_AM_I = '@newtash/react-app/CLEAR_WHO_AM_I';

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
