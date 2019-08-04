import { combineReducers } from 'redux';
import {
  SET_ART_MAIN_V_ARTIKL,
  CLEAR_ART_MAIN_DASH_DATA,
  SET_ART_MAIN_DASH_DATA,
  SET_ART_MAIN_DASH_PAGING,
  SET_ART_MAIN_DASH_FETCHING,
  SET_ART_MAIN_DASH_FILTER_TEXT,
} from '../actions';
import { V_ARTIKL_ROBA } from '../../config';

const vArtikl = (state = V_ARTIKL_ROBA, action) =>
  action.type === SET_ART_MAIN_V_ARTIKL ? action.payload : state;

const dashData = (state = [], action) => {
  switch (action.type) {
    case SET_ART_MAIN_DASH_DATA:
      return action.payload;
    case CLEAR_ART_MAIN_DASH_DATA:
      return [];
    default:
      return state;
  }
};

const dashPaging = (state = {}, action) => {
  switch (action.type) {
    case SET_ART_MAIN_DASH_PAGING:
      return action.payload;
    // case CLEAR_ART_MAIN_DASH_DATA:
    //   return {};
    default:
      return state;
  }
};

const dashFetching = (state = null, action) => {
  switch (action.type) {
    case SET_ART_MAIN_DASH_FETCHING:
      return action.payload;
    // case CLEAR_ART_MAIN_DASH_DATA:
    //   return null;
    default:
      return state;
  }
};

const dashFilterText = (state = '', action) =>
  action.type === SET_ART_MAIN_DASH_FILTER_TEXT ? action.payload : state;

export default combineReducers({
  vArtikl,
  dashData,
  dashPaging,
  dashFetching,
  dashFilterText,
});
