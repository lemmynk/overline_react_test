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
  FETCH_ART_MAIN_FORM_DATA,
  SAVE_ART_MAIN_FORM_DATA,
  DELETE_ART_MAIN_FORM_DATA,
  fetchArtMainDashData,
  clearArtMainDashData,
  setArtMainDashData,
  setArtMainDashPaging,
  setArtMainDashFetching,
  clearArtMainFormData,
  setArtMainFormData,
  setArtMainFormFetching,
} from '../actions';
import {
  selectArtMainDashVArtikl,
  selectArtMainDashFilterText,
  selectArtMainDashFilterSelect,
} from '../selectors';

/*
 |---------------------------------------------------------------------------------
 | ART MAIN DASHBOARD
 |---------------------------------------------------------------------------------
 */

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
    const grpId = yield select(selectArtMainDashFilterSelect);
    const configValue = yield select(selectAppConfigValue);
    const perPage = configValue('DEFAULT_PAGINATION') || 20;

    const query = { page, perPage, s };
    if (parseInt(grpId, 10) > 0) {
      query.grpId = grpId;
    }

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
  }
}

/*
 |---------------------------------------------------------------------------------
 | ART MAIN FORM
 |---------------------------------------------------------------------------------
 | @todo: handle new intSifra value...
 |
 */

const doFetchArtMainData = artId =>
  api
    .get(`/art-main/${artId}`)
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* fetchFormDataFlow() {
  while (true) {
    const { payload: artId } = yield take(FETCH_ART_MAIN_FORM_DATA);

    yield all([
      put(setArtMainFormFetching(FETCH_STATUS_FETCHING)),
      put(clearArtMainFormData()),
    ]);

    const { response, error } = yield doFetchArtMainData(artId);

    if (response) {
      yield all([
        put(setArtMainFormData(response)),
        put(setArtMainFormFetching(FETCH_STATUS_SUCCEEDED)),
      ]);
    } else {
      if (error) {
        yield put(addAppError(error));
      }
      yield put(setArtMainFormFetching(FETCH_STATUS_FAILED));
    }
  }
}

const saveFormDataRequest = formData =>
  formData.id
    ? api
        .put(`/art-main/${formData.id}`, formData)
        .then(() => ({ id: formData.id }))
    : api.post('/art-main', formData).then(response => response.data);

const doSaveFormData = formData =>
  saveFormDataRequest(formData)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* saveArtMainFormDataFlow() {
  while (true) {
    const { payload: formData } = yield take(SAVE_ART_MAIN_FORM_DATA);

    yield put(setArtMainFormFetching(FETCH_STATUS_FETCHING));

    const { response, error } = yield doSaveFormData(formData);

    if (response) {
      yield all([
        put(setArtMainFormData({ ...formData, ...response })),
        put(setArtMainFormFetching(FETCH_STATUS_SUCCEEDED)),
      ]);
    } else {
      if (error) {
        yield put(addAppError(error));
      }
      yield put(setArtMainFormFetching(FETCH_STATUS_FAILED));
    }
  }
}

const doDeleteArtMain = artId =>
  api
    .delete(`/art-main/${artId}`)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* deleteArtMainFormDataFlow() {
  while (true) {
    const { payload: artId } = yield take(DELETE_ART_MAIN_FORM_DATA);

    const { error } = yield doDeleteArtMain(artId);

    if (error) {
      yield put(addAppError(error));
    } else {
      yield put(fetchArtMainDashData(1));
    }
  }
}

export default [
  fetchDashDataFlow,
  fetchFormDataFlow,
  saveArtMainFormDataFlow,
  deleteArtMainFormDataFlow,
];
