import {
  SET_FORM_DATA,
  SET_FORM_ERRORS,
  SET_FORM_DATA_PROP_VALUE,
  // SET_FORM_DATA_PROP_CHANGED,
  SET_FORM_DATA_PROP_ERRORS,
} from './actions';

export const initialState = {
  data: {},
  errors: {},
};

export default (state = initialState, action) => {
  const { type, key, payload } = action;
  switch (type) {
    case SET_FORM_DATA:
      return { ...state, data: payload };

    case SET_FORM_ERRORS:
      return { ...state, errors: payload };

    case SET_FORM_DATA_PROP_VALUE: {
      const newState = { ...state.data, [key]: payload };
      return { ...state, data: newState };
    }

    case SET_FORM_DATA_PROP_ERRORS: {
      const newState = { ...state.errors, [key]: payload };
      return { ...state, errors: newState };
    }

    default:
      return state;
  }
};
