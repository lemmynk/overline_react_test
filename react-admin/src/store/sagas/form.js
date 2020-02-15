import { take, all, put } from 'redux-saga/effects';
import {
  DO_INIT_FORM,
  DO_SAVE_FORM,
  DO_DELETE_FORM,
  setFormData,
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
} from '../../config';

const blacklist = ['id', 'createdAt', 'updatedAt', 'deletedAt'];

function* doInitFormFlow() {
  while (true) {
    const action = yield take(DO_INIT_FORM);

    // eslint-disable-next-line no-console
    console.log('...do init form ...', action);
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

export default [doInitFormFlow, doSaveFormFlow, doDeleteFormFlow];
