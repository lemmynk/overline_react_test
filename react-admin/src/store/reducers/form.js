import { combineReducers } from 'redux';
import {
  DO_INIT_FORM,
  SET_FORM_DATA,
  SET_FORM_DATA_FETCHING,
  SET_FORM_FETCHING,
  SET_FORM_ERRORS,
  CLEAR_FORM_ERRORS,
} from '../actions';

const data = (state = {}, action) => {
  switch (action.type) {
    case DO_INIT_FORM:
    case SET_FORM_DATA:
      return action.payload;
    default:
      return state;
  }
};

const dataFetching = (state = null, action) => {
  switch (action.type) {
    case DO_INIT_FORM:
      return action.fetching || null;
    case SET_FORM_DATA_FETCHING:
      return action.payload;
    default:
      return state;
  }
};

const fetching = (state = false, action) => {
  switch (action.type) {
    case DO_INIT_FORM:
      return false;
    case SET_FORM_FETCHING:
      return !!action.payload;
    default:
      return state;
  }
};

const errors = (state = {}, action) => {
  switch (action.type) {
    case DO_INIT_FORM:
    case CLEAR_FORM_ERRORS:
      return {};
    case SET_FORM_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  fetching,
  dataFetching,
  data,
  errors,
});
