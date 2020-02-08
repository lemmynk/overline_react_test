import { combineReducers } from 'redux';
import { SET_APP_REDIRECT_URL } from '../actions';

const redirectUrl = (state = '/', action) =>
  action.type === SET_APP_REDIRECT_URL ? action.payload : state;

export default combineReducers({
  redirectUrl,
});
