export const SET_ALL = 'SET_ALL';
export const SET_IS_READY = 'SET_IS_READY';

export const initialState = {
  data: {},
  version: 0,
  isReady: false,
};

const combineData = (state, newState) => {
  const { data: currentData } = state;
  const { data: newData } = newState;
  const data = { ...currentData, ...newData };
  return {
    ...state,
    ...newState,
    data,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ALL:
      return combineData(state, action.payload);
    case SET_IS_READY:
      return { ...state, isReady: !!action.payload };
    default:
      return state;
  }
};
