export const FETCH_ART_PDVS = '@newtash/react-app/FETCH_ART_PDVS';
export const SET_ART_PDVS = '@newtash/react-app/SET_ART_PDVS';

export const fetchArtPdvs = () => ({
  type: FETCH_ART_PDVS,
});

export const setArtPdvs = pdvs => ({
  type: SET_ART_PDVS,
  payload: pdvs,
});
