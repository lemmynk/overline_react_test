import { take, all, put } from 'redux-saga/effects';
import {
  FETCH_FORM_DATA,
  DO_SAVE_FORM,
  DO_DELETE_FORM,
  setFormData,
  setFormDataFetching,
  setFormFetching,
  setFormErrors,
  clearFormErrors,
  addAppError,
} from '../actions';
import { apiInstance } from '../api';
import {
  RESPONSE_STATUS_CREATED,
  // RESPONSE_STATUS_NO_CONSENT,
  RESPONSE_STATUS_UNPROCESSABLE_ENTITY,
  FETCH_STATUS_FETCHING,
  FETCH_STATUS_SUCCEEDED,
  FETCH_STATUS_FAILED,
} from '../../config';

const blacklist = ['id', 'createdAt', 'updatedAt', 'deletedAt'];

const doFetchFormData = ({ url }) =>
  apiInstance
    .get(url)
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* doFetchFormDataFlow() {
  while (true) {
    const { payload } = yield take(FETCH_FORM_DATA);

    yield all([put(setFormDataFetching(FETCH_STATUS_FETCHING))]);

    const { response, error } = yield doFetchFormData(payload);

    if (response) {
      yield all([
        put(setFormData(response)),
        put(setFormDataFetching(FETCH_STATUS_SUCCEEDED)),
      ]);
    } else if (error) {
      yield all([
        put(addAppError(error)),
        put(setFormDataFetching(FETCH_STATUS_FAILED)),
      ]);
    }
  }
}

const whitelistData = data =>
  Object.keys(data)
    .filter(key => typeof data[key] !== 'undefined' && !blacklist.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});

const doSaveFormData = (url, data) => {
  const { id } = data;
  const withData = whitelistData(data);
  const request = id
    ? apiInstance.put(`${url}/${id}`, withData)
    : apiInstance.post(url, withData);
  return request.then(response => ({ response })).catch(error => ({ error }));
};

function* doSaveFormFlow() {
  while (true) {
    const { payload, callback } = yield take(DO_SAVE_FORM);
    const { url, data } = payload;

    yield all([put(setFormFetching(true)), put(clearFormErrors())]);

    const { response, error } = yield doSaveFormData(url, data);

    // console.log('...do save form...', response, error);

    if (response) {
      const { status, data: responseData } = response;
      if (status === RESPONSE_STATUS_UNPROCESSABLE_ENTITY) {
        // Unprocessable Entity
        yield put(setFormErrors(responseData));
      } else if (status === RESPONSE_STATUS_CREATED) {
        // Created
        yield put(setFormData({ ...data, ...responseData }));
      }
      if (callback) {
        callback(response);
      }
    } else if (error) {
      yield put(addAppError(error));
    }

    yield put(setFormFetching(false));
  }
}

const doDeleteFormData = (url, id) =>
  apiInstance
    .delete(`${url}/${id}`)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* doDeleteFormFlow() {
  while (true) {
    const { payload, callback } = yield take(DO_DELETE_FORM);
    const { url, id, errorMsg } = payload;

    const { response, error } = yield doDeleteFormData(url, id);

    console.log('...do delete form...', { response, error });

    if (response) {
      const { status } = response;
      if (status === RESPONSE_STATUS_UNPROCESSABLE_ENTITY) {
        // Unprocessable Entity
        yield put(addAppError(errorMsg));
      }
      if (callback) {
        callback(response);
      }
    } else if (error) {
      yield put(addAppError(error));
    }
  }
}

export default [doFetchFormDataFlow, doSaveFormFlow, doDeleteFormFlow];
