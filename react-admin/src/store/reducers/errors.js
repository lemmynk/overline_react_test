import { ADD_APP_ERROR, CLEAR_APP_ERRORS } from '../actions';

const errors = (state = [], action) => {
  switch (action.type) {
    case ADD_APP_ERROR:
      if (typeof action.payload === 'string') {
        return [...state, action.payload];
      }
      // In case of array
      if (typeof action.payload === 'object' && action.payload.length) {
        return [...state, ...action.payload];
      }
      // Otherwise add JSON stringified error as string
      return [...state, JSON.stringify(action.payload)];
    case CLEAR_APP_ERRORS:
      return [];
    default:
      return state;
  }
};

export default errors;
