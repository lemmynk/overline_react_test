import { combineReducers } from 'redux';
import {
  // DO_SAVE_ART_GROUP,
  // DO_DELETE_ART_GROUP,
  SET_ART_GROUPS,
  SET_ART_GROUPS_VERSION,
  SET_ART_GROUP_DASH_V_ARTIKL,
  SET_ART_GROUP_DASH_FETCHING,
  SET_ART_GROUP_DASH_FILTER_TEXT,
} from '../actions';
import { V_ARTIKL_ROBA } from '../../config';

const dashVArtikl = (state = V_ARTIKL_ROBA, action) =>
  action.type === SET_ART_GROUP_DASH_V_ARTIKL ? action.payload : state;

const data = (state = {}, action) =>
  action.type === SET_ART_GROUPS ? { ...state, ...action.payload } : state;

const version = (state = 0, action) =>
  action.type === SET_ART_GROUPS_VERSION ? action.payload : state;

const dashFetching = (state = null, action) => {
  switch (action.type) {
    case SET_ART_GROUP_DASH_FETCHING:
      return action.payload;
    // case CLEAR_ART_MAIN_DASH_DATA:
    //   return null;
    default:
      return state;
  }
};

const dashFilterText = (state = '', action) =>
  action.type === SET_ART_GROUP_DASH_FILTER_TEXT ? action.payload : state;

export default combineReducers({
  dashVArtikl,
  data,
  version,
  dashFetching,
  dashFilterText,
});
