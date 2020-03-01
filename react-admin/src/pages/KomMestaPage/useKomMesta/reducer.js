import { combineByKey } from '../../../utils';

export const SET_ALL = 'SET_ALL';
export const SET_VERSION = 'SET_VERSION';
export const SET_DATA = 'SET_DATA';
export const SET_IS_READY = 'SET_IS_READY';

export const initialState = {
  version: 0,
  data: [],
  isReady: false,
};

const combineData = (prevState, nextState) => {
  const { data: prevData } = prevState;
  const { data: nextData } = nextState;
  const data = combineByKey(prevData, nextData, 'id');

  return { ...prevState, ...nextState, data };
};

export const reducer = (state, action) => {
  // console.log('dispatch:', action);
  switch (action.type) {
    case SET_ALL:
      return combineData(state, action.payload);
    case SET_VERSION:
      return { ...state, version: action.payload };
    case SET_DATA:
      return { ...state, data: action.payload };
    case SET_IS_READY:
      return { ...state, isReady: !!action.payload };
    default:
      return state;
  }
};
