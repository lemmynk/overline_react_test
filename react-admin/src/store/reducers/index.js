import { combineReducers } from 'redux';
import reduxState from '../reduxState';
import appReducer from './app';
import appConfigReducer from './appConfig';
import authReducer from './auth';
import whoAmIReducer from './whoAmI';
import errorsReducer from './errors';
import artPdvReducer from './artPdv';

const { APP, APP_CONFIG, AUTH, WHO_AM_I, ERRORS, ART_PDV } = reduxState;

export default combineReducers({
  [APP]: appReducer,
  [APP_CONFIG]: appConfigReducer,
  [AUTH]: authReducer,
  [WHO_AM_I]: whoAmIReducer,
  [ERRORS]: errorsReducer,

  [ART_PDV]: artPdvReducer,
});
