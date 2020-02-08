import { take, put, select, all } from 'redux-saga/effects';
import {
  FETCH_ART_GROUPS,
  setArtGroupsData,
  setArtGroupsVersion,
  addAppError,
} from '../actions';
import { selectArtGroupVersion } from '../selectors';
import { queryUrl } from '../../utils';
import { apiInstance } from '../api';

const makeFetchArtGroupsRequest = v =>
  apiInstance
    .get(queryUrl('/art-grupa', { v }))
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* fetchArtGroupsFlow() {
  while (true) {
    yield take(FETCH_ART_GROUPS);

    const v = yield select(selectArtGroupVersion);

    const { response, error } = yield makeFetchArtGroupsRequest(v);

    if (response) {
      const { data, version } = response;
      yield all([
        put(setArtGroupsData(data)),
        put(setArtGroupsVersion(version)),
      ]);
    } else if (error) {
      yield put(addAppError(error));
    }
  }
}

export default [fetchArtGroupsFlow];
