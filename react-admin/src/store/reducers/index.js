import { combineReducers } from 'redux';
import reduxState from '../reduxState';
import appReducer from './app';
import appConfigReducer from './appConfig';
import authReducer from './auth';
import whoAmIReducer from './whoAmI';
import errorsReducer from './errors';

import formReducer from './form';
import artPdvReducer from './artPdv';
import artGrupaReducer from './artGrupa';
import artMainReducer from './artMain';

const {
  APP,
  APP_CONFIG,
  AUTH,
  WHO_AM_I,
  ERRORS,
  FORM,
  ART_PDV,
  ART_GRUPA,
  ART_MAIN,
} = reduxState;

export default combineReducers({
  [APP]: appReducer,
  [APP_CONFIG]: appConfigReducer,
  [AUTH]: authReducer,
  [WHO_AM_I]: whoAmIReducer,
  [ERRORS]: errorsReducer,

  [FORM]: formReducer,
  [ART_PDV]: artPdvReducer,
  [ART_GRUPA]: artGrupaReducer,
  [ART_MAIN]: artMainReducer,
});
