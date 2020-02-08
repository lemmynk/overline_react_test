import { NS } from '../reduxState';

export const FETCH_ART_GROUPS = `${NS}/FETCH_ART_GROUPS`;
export const SET_ART_GROUPS_DATA = `${NS}/SET_ART_GROUPS_DATA`;
export const SET_ART_GROUPS_VERSION = `${NS}/SET_ART_GROUPS_VERSION`;
export const SET_ART_GROUPS_VARTIKL = `${NS}/SET_ART_GROUPS_VARTIKL`;

export const fetchArtGroups = () => ({
  type: FETCH_ART_GROUPS,
});

export const setArtGroupsData = pdvs => ({
  type: SET_ART_GROUPS_DATA,
  payload: pdvs,
});

export const setArtGroupsVersion = version => ({
  type: SET_ART_GROUPS_VERSION,
  payload: parseInt(version, 10),
});

export const setArtGroupsVArtikl = vArtikl => ({
  type: SET_ART_GROUPS_VARTIKL,
  payload: vArtikl,
});
