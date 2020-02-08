import { combineReducers } from 'redux';
import {
  // DO_UPDATE_APP_CONFIG,
  SET_APP_REDIRECT_URL,
  // SET_APP_CONFIG,
  // SET_APP_CONFIG_VERISON,
} from '../actions';

const redirectUrl = (state = '/', action) =>
  action.type === SET_APP_REDIRECT_URL ? action.payload : state;

export default combineReducers({
  redirectUrl,
});
