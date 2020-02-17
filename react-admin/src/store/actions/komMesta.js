import { NS } from '../reduxState';

export const FETCH_KOM_MESTA = `${NS}/FETCH_KOM_MESTA`;
export const SET_KOM_MESTA_DATA = `${NS}/SET_KOM_MESTA_DATA`;
export const SET_KOM_MESTA_VERSION = `${NS}/SET_KOM_MESTA_VERSION`;

export const fetchKomMesta = () => ({
  type: FETCH_KOM_MESTA,
});

export const setKomMestaData = mesta => ({
  type: SET_KOM_MESTA_DATA,
  payload: mesta,
});

export const setKomMestaVersion = version => ({
  type: SET_KOM_MESTA_VERSION,
  payload: parseInt(version, 10),
});
