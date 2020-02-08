import { combineReducers } from 'redux';
import { SET_APP_CONFIG, SET_APP_CONFIG_VERISON } from '../actions';

const data = (state = {}, action) =>
  action.type === SET_APP_CONFIG ? { ...state, ...action.payload } : state;

const version = (state = 0, action) =>
  action.type === SET_APP_CONFIG_VERISON ? parseInt(action.payload, 10) : state;

export default combineReducers({
  data,
  version,
});
