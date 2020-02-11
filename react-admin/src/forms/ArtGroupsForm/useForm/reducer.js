import { SET_FORM_DATA, SET_FORM_DATA_PROP_VALUE } from './actions';

export default (state = {}, action) => {
  const { type, key, payload } = action;
  switch (type) {
    case SET_FORM_DATA:
      return payload;
    case SET_FORM_DATA_PROP_VALUE:
      return { ...state, [key]: payload };
    default:
      return state;
  }
};
