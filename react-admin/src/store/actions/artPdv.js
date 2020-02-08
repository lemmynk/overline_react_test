import { NS } from '../reduxState';

export const FETCH_ART_PDVS = `${NS}/FETCH_ART_PDVS`;
export const SET_ART_PDVS_DATA = `${NS}/SET_ART_PDVS_DATA`;
export const SET_ART_PDVS_VERSION = `${NS}/SET_ART_PDVS_VERSION`;

export const fetchArtPdvs = () => ({
  type: FETCH_ART_PDVS,
});

export const setArtPdvsData = pdvs => ({
  type: SET_ART_PDVS_DATA,
  payload: pdvs,
});

export const setArtPdvsVersion = version => ({
  type: SET_ART_PDVS_VERSION,
  payload: parseInt(version, 10),
});
