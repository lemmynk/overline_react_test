import { takeLatest, all, put } from 'redux-saga/effects';
import qs from 'qs';
import { apiInstance } from '../api';
import {
  ART_MAIN_CRUD_URL,
  FETCH_STATUS_FETCHING,
  FETCH_STATUS_SUCCEEDED,
  FETCH_STATUS_FAILED,
} from '../../config';
import {
  FETCH_ART_MAIN,
  setArtMainFetching,
  setArtMainData,
  setArtMainPagination,
  addAppError,
} from '../actions';

const url = payload => {
  // Strip undefined values
  const query = Object.keys(payload)
    .filter(
      key =>
        typeof payload[key] !== 'undefined' &&
        payload[key].toString().length > 0,
    )
    .reduce((acc, key) => ({ ...acc, [key]: payload[key] }), {});
  return [
    ART_MAIN_CRUD_URL,
    qs.stringify({ ...query, deletedAt: 'NULL' }),
  ].join('?');
};

const doFetchArtMain = payload =>
  apiInstance
    .get(url(payload))
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* doFetchArtMainFlow({ payload }) {
  yield all([put(setArtMainFetching(FETCH_STATUS_FETCHING))]);

  const { response, error } = yield doFetchArtMain(payload);
  // console.log('doFetchArtMainFlow', response, error);

  if (response) {
    const { data, pagination } = response;
    const { perPage, totalItems } = pagination;
    const paging = { ...pagination, dataLength: Math.min(perPage, totalItems) };
    yield all([
      put(setArtMainData(data)),
      put(setArtMainPagination(paging)),
      put(setArtMainFetching(FETCH_STATUS_SUCCEEDED)),
    ]);
  } else if (error) {
    yield all([
      put(addAppError(error)),
      put(setArtMainFetching(FETCH_STATUS_FAILED)),
    ]);
  }
}

function* fetchLatestDoFetchArtMain() {
  yield takeLatest(FETCH_ART_MAIN, doFetchArtMainFlow);
}

export default [fetchLatestDoFetchArtMain];
