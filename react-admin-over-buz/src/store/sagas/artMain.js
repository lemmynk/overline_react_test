import { take, all, put, select } from 'redux-saga/effects';
import {
  api,
  addAppError,
  FETCH_STATUS_FETCHING,
  FETCH_STATUS_SUCCEEDED,
  FETCH_STATUS_FAILED,
} from '@newtash/react-app-core';
import {
  FETCH_ART_MAIN_DASH_DATA,
  clearArtMainDashData,
  setArtMainDashData,
  setArtMainDashPaging,
  setArtMainDashFetching,
} from '../actions';
import { selectArtMainDashVArtikl } from '../selectors';

const doFetchArtMainDashData = (vArtikl, page) => {
  const url = `/art-main/${vArtikl}?page=${page}`;
  return api
    .get(url)
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

function* fetchDashDataFlow() {
  while (true) {
    const { payload: page } = yield take(FETCH_ART_MAIN_DASH_DATA);

    const vArtikl = yield select(selectArtMainDashVArtikl);

    yield all([
      put(setArtMainDashFetching(FETCH_STATUS_FETCHING)),
      put(clearArtMainDashData()),
    ]);

    const { response, error } = yield doFetchArtMainDashData(vArtikl, page);

    if (response) {
      const { data, pagination } = response;
      const paging = { ...pagination, dataLength: data.length };
      yield all([
        put(setArtMainDashData(data)),
        put(setArtMainDashPaging(paging)),
        put(setArtMainDashFetching(FETCH_STATUS_SUCCEEDED)),
      ]);
    } else {
      if (error) {
        yield put(addAppError(error));
      }
      yield put(setArtMainDashFetching(FETCH_STATUS_FAILED));
    }

    // eslint-disable-next-line no-console
    console.log('...do fetch dash data...', page, response, error);

    yield all([put(setArtMainDashFetching(FETCH_STATUS_SUCCEEDED))]);
  }
}

export default [fetchDashDataFlow];
