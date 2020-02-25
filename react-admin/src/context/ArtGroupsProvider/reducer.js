export const SET_ALL = 'SET_ALL';
export const SET_V_ARTIKL = 'SET_V_ARTIKL';
export const SET_DATA = 'SET_DATA';
export const SET_IS_READY = 'SET_IS_READY';

export const initialState = {
  vArtikl: 'roba',
  data: [],
  isReady: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ALL:
      return action.payload;
    case SET_V_ARTIKL:
      return { ...state, vArtikl: action.payload };
    case SET_DATA:
      return { ...state, data: action.payload };
    case SET_IS_READY:
      return { ...state, isReady: !!action.payload };
    default:
      return state;
  }
};
