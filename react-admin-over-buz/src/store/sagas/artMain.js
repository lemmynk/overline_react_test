import { take, all, put, select } from 'redux-saga/effects';
import {
  api,
  queryUrl,
  addAppError,
  FETCH_STATUS_FETCHING,
  FETCH_STATUS_SUCCEEDED,
  FETCH_STATUS_FAILED,
  selectAppConfigValue,
} from '@newtash/react-app-core';
import {
  FETCH_ART_MAIN_DASH_DATA,
  clearArtMainDashData,
  setArtMainDashData,
  setArtMainDashPaging,
  setArtMainDashFetching,
} from '../actions';
import {
  selectArtMainDashVArtikl,
  selectArtMainDashFilterText,
} from '../selectors';

const doFetchArtMainDashData = (vArtikl, query) => {
  const url = queryUrl(`/art-main/${vArtikl}`, query);
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
    const s = yield select(selectArtMainDashFilterText);
    const configValue = yield select(selectAppConfigValue);
    const perPage = configValue('DEFAULT_PAGINATION') || 20;

    const query = { page, perPage, s };

    yield all([
      put(setArtMainDashFetching(FETCH_STATUS_FETCHING)),
      put(clearArtMainDashData()),
    ]);

    const { response, error } = yield doFetchArtMainDashData(vArtikl, query);

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

    yield all([put(setArtMainDashFetching(FETCH_STATUS_SUCCEEDED))]);
  }
}

export default [fetchDashDataFlow];
