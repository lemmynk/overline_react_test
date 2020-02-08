import { combineReducers } from 'redux';
import {
  SET_ART_GROUPS_DATA,
  SET_ART_GROUPS_VERSION,
  SET_ART_GROUPS_VARTIKL,
} from '../actions';
import { combineByKey } from '../../utils';

const data = (state = [], action) =>
  action.type === SET_ART_GROUPS_DATA
    ? combineByKey(state, action.payload, 'id')
    : state;

const version = (state = 0, action) =>
  action.type === SET_ART_GROUPS_VERSION ? action.payload : state;

const vArtikl = (state = 'roba', action) =>
  action.type === SET_ART_GROUPS_VARTIKL ? action.payload : state;

export default combineReducers({
  data,
  version,
  vArtikl,
});
