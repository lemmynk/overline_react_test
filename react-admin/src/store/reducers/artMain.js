import { combineReducers } from 'redux';
import {
  CLEAR_ART_MAIN_DATA,
  SET_ART_MAIN_DATA,
  SET_ART_MAIN_ITEM_DATA,
  SET_ART_MAIN_PAGINATION,
  SET_ART_MAIN_FETCHING,
  SET_ART_MAIN_VARTIKL,
} from '../actions';

const data = (state = [], action) => {
  switch (action.type) {
    case CLEAR_ART_MAIN_DATA:
      return [];
    case SET_ART_MAIN_DATA:
      return action.payload;
    default:
      return state;
  }
};

const itemData = (state = {}, action) => {
  switch (action.type) {
    case CLEAR_ART_MAIN_DATA:
      return {};
    case SET_ART_MAIN_ITEM_DATA:
      return action.payload;
    default:
      return state;
  }
};

const pagination = (state = {}, action) => {
  switch (action.type) {
    case CLEAR_ART_MAIN_DATA:
      return [];
    case SET_ART_MAIN_PAGINATION:
      return action.payload;
    default:
      return state;
  }
};

const fetching = (state = null, action) => {
  switch (action.type) {
    case CLEAR_ART_MAIN_DATA:
      return null;
    case SET_ART_MAIN_FETCHING:
      return action.payload;
    default:
      return state;
  }
};

const vArtikl = (state = 'roba', action) =>
  action.type === SET_ART_MAIN_VARTIKL ? action.payload : state;

export default combineReducers({
  itemData,
  data,
  pagination,
  fetching,
  vArtikl,
});
