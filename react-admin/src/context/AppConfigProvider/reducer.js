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
    case 'setState':
      return combineData(state, action.payload);
    case 'setReady':
      return { ...state, isReady: !!action.payload };
    default:
      return state;
  }
};
