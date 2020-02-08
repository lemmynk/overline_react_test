import { combineReducers } from 'redux';
import { SET_ART_PDVS_DATA, SET_ART_PDVS_VERSION } from '../actions';
import { combineByKey } from '../../utils';

const data = (state = [], action) =>
  action.type === SET_ART_PDVS_DATA
    ? combineByKey(state, action.payload, 'id')
    : state;

const version = (state = 0, action) =>
  action.type === SET_ART_PDVS_VERSION ? action.payload : state;

export default combineReducers({
  data,
  version,
});
