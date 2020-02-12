import {
  SET_FORM_DATA,
  SET_FORM_ERRORS,
  SET_FORM_DATA_PROP_VALUE,
  SET_FORM_DATA_PROP_CHANGED,
  SET_FORM_DATA_PROP_ERRORS,
} from './actions';

export default (state = {}, action) => {
  const { type, key, payload } = action;
  switch (type) {
    case SET_FORM_DATA:
      return Object.keys(payload).reduce(
        (acc, val) => ({
          ...acc,
          [val]: {
            value: payload[val],
            isChanged: false,
            errors: [],
          },
        }),
        {},
      );
    case SET_FORM_ERRORS: {
      const newState = Object.keys(payload).reduce(
        (acc, val) => ({ ...state[val], errors: payload[val] }),
        {},
      );
      return { ...state, ...newState };
    }
    case SET_FORM_DATA_PROP_VALUE: {
      const newState = {
        ...state[key],
        value: payload,
        isChanged: true,
        errors: [],
      };
      return { ...state, [key]: newState };
    }
    case SET_FORM_DATA_PROP_CHANGED: {
      const newState = {
        ...state[key],
        isChanged: payload,
      };
      return { ...state, [key]: newState };
    }
    case SET_FORM_DATA_PROP_ERRORS: {
      const newState = {
        ...state[key],
        errors: payload,
      };
      return { ...state, [key]: newState };
    }
    default:
      return state;
  }
};
