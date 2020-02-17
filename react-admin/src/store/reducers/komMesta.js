import { combineReducers } from 'redux';
import { SET_KOM_MESTA_DATA, SET_KOM_MESTA_VERSION } from '../actions';
import { combineByKey } from '../../utils';

const data = (state = [], action) =>
  action.type === SET_KOM_MESTA_DATA
    ? combineByKey(state, action.payload, 'id')
    : state;

const version = (state = 0, action) =>
  action.type === SET_KOM_MESTA_VERSION ? action.payload : state;

export default combineReducers({
  data,
  version,
});
