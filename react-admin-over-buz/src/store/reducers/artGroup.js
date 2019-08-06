import { combineReducers } from 'redux';
import { SET_ART_GROUPS, SET_ART_GROUPS_VERSION } from '../actions';

const data = (state = {}, action) =>
  action.type === SET_ART_GROUPS ? { ...state, ...action.payload } : state;

const version = (state = 0, action) =>
  action.type === SET_ART_GROUPS_VERSION ? action.payload : state;

export default combineReducers({
  data,
  version,
});
