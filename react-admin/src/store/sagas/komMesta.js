import { take, put, select, all } from 'redux-saga/effects';
import {
  FETCH_KOM_MESTA,
  setKomMestaData,
  setKomMestaVersion,
  addAppError,
} from '../actions';
import { selectArtGroupVersion } from '../selectors';
import { queryUrl } from '../../utils';
import { apiInstance } from '../api';
import { KOM_MESTA_CRUD_URL } from '../../config';

const makeFetchKomMestaRequest = v =>
  apiInstance
    .get(queryUrl(KOM_MESTA_CRUD_URL, { v }))
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* fetchKomMestaFlow() {
  while (true) {
    yield take(FETCH_KOM_MESTA);

    const v = yield select(selectArtGroupVersion);

    const { response, error } = yield makeFetchKomMestaRequest(v);

    if (response) {
      const { data, version } = response;
      yield all([put(setKomMestaData(data)), put(setKomMestaVersion(version))]);
    } else if (error) {
      yield put(addAppError(error));
    }
  }
}

export default [fetchKomMestaFlow];
