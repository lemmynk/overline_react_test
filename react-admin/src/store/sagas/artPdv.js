import { take, put, select, all } from 'redux-saga/effects';
import {
  FETCH_ART_PDVS,
  setArtPdvsData,
  setArtPdvsVersion,
  addAppError,
} from '../actions';
import { selectArtPdvVersion } from '../selectors';
import { queryUrl } from '../../utils';
import { apiInstance } from '../api';

const fetchAppConfig = v =>
  apiInstance
    .get(queryUrl('/art-pdv', { v }))
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* fetchArtPdvsFlow() {
  while (true) {
    yield take(FETCH_ART_PDVS);

    const v = yield select(selectArtPdvVersion);

    const { response, error } = yield fetchAppConfig(v);

    if (response) {
      const { data, version } = response;
      yield all([put(setArtPdvsData(data)), put(setArtPdvsVersion(version))]);
    } else if (error) {
      yield put(addAppError(error));
    }
  }
}

export default [fetchArtPdvsFlow];
