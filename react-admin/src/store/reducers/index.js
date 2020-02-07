import { combineReducers } from 'redux';
import reduxState from '../reduxState';
import appReducers from './app';
import authReducers from './auth';
import whoAmIReducer from './whoAmI';
import errorsReducer from './errors';

// const { APP, AUTH, WHO_AM_I, ERRORS } = reduxState;
const { APP, AUTH, WHO_AM_I, ERRORS } = reduxState;

export default combineReducers({
  [APP]: appReducers,
  [AUTH]: authReducers,
  [WHO_AM_I]: whoAmIReducer,
  [ERRORS]: errorsReducer,
});
