import { combineReducers } from 'redux';
import {
  DO_LOGOUT,
  SET_ACCESS_TOKEN,
  CLEAR_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  CLEAR_REFRESH_TOKEN,
  SET_EXPIRES_AT,
  CLEAR_EXPIRES_AT,
} from '../actions';

const accessToken = (state = null, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return action.payload;
    case CLEAR_ACCESS_TOKEN:
    case DO_LOGOUT:
      return null;
    default:
      return state;
  }
};

const refreshToken = (state = null, action) => {
  switch (action.type) {
    case SET_REFRESH_TOKEN:
      return action.payload;
    case CLEAR_REFRESH_TOKEN:
    case DO_LOGOUT:
      return null;
    default:
      return state;
  }
};

const expiresAt = (state = null, action) => {
  switch (action.type) {
    case SET_EXPIRES_AT:
      return parseInt(action.payload, 0);
    case CLEAR_EXPIRES_AT:
    case DO_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  accessToken,
  refreshToken,
  expiresAt,
});
