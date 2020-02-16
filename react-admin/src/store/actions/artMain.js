import { NS } from '../reduxState';

export const FETCH_ART_MAIN = `${NS}/FETCH_ART_MAIN`;
export const FETCH_ART_MAIN_ITEM = `${NS}/FETCH_ART_MAIN_ITEM`;
export const SET_ART_MAIN_FETCHING = `${NS}/SET_ART_MAIN_FETCHING`;
export const CLEAR_ART_MAIN_DATA = `${NS}/CLEAR_ART_MAIN_DATA`;
export const SET_ART_MAIN_ITEM_DATA = `${NS}/SET_ART_MAIN_ITEM_DATA`;
export const SET_ART_MAIN_DATA = `${NS}/SET_ART_MAIN_DATA`;
export const SET_ART_MAIN_PAGINATION = `${NS}/SET_ART_MAIN_PAGINATION`;
export const SET_ART_MAIN_VARTIKL = `${NS}/SET_ART_MAIN_VARTIKL`;

export const fetchArtMain = payload => ({
  type: FETCH_ART_MAIN,
  payload,
});

export const fetchArtMainItem = id => ({
  type: FETCH_ART_MAIN,
  payload: id,
});

export const setArtMainFetching = fetching => ({
  type: SET_ART_MAIN_FETCHING,
  payload: fetching,
});

export const clearArtMainData = () => ({
  type: CLEAR_ART_MAIN_DATA,
});

export const setArtMainItemData = data => ({
  type: SET_ART_MAIN_ITEM_DATA,
  payload: data,
});

export const setArtMainData = arts => ({
  type: SET_ART_MAIN_DATA,
  payload: arts,
});

export const setArtMainPagination = pagination => ({
  type: SET_ART_MAIN_PAGINATION,
  payload: pagination,
});

export const setArtMainVArtikl = vArtikl => ({
  type: SET_ART_MAIN_VARTIKL,
  payload: vArtikl,
});
