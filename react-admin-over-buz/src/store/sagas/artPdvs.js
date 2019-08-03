import { take, put } from 'redux-saga/effects';
import { api, addAppError } from '@newtash/react-app-core';
import { FETCH_ART_PDVS, setArtPdvs } from '../actions';

const doFetchArtPdvs = () =>
  api
    .get('/art-pdv')
    .then(response => response.data)
    .then(response => response.data)
    .then(response =>
      response.map(item => ({
        id: item.id,
        pdvStopa: item.pdvStopa / 100,
        pdvOpis: item.pdvOpis,
        isDefault: item.isDefault,
        fisPdv: item.fisPdv,
      })),
    )
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* fetchArtPdvsFlow() {
  while (true) {
    yield take(FETCH_ART_PDVS);

    const { response, error } = yield doFetchArtPdvs();
    if (response) {
      yield put(setArtPdvs(response));
    } else if (error) {
      yield put(addAppError(error));
    }
  }
}

export default [fetchArtPdvsFlow];
