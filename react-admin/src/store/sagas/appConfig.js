import { take, put, select, all } from 'redux-saga/effects';
import {
  DO_FETCH_APP_CONFIG,
  DO_UPDATE_APP_CONFIG,
  setAppConfig,
  setAppConfigVersion,
  addAppError,
} from '../actions';
import { selectAppConfigVersion } from '../selectors';
import { queryUrl } from '../../utils';
import { apiInstance } from '../../factories/apiFactory';

const fetchAppConfig = v =>
  apiInstance
    .get(queryUrl('/app-config', { v }))
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* fetchAppConfigFlow() {
  while (true) {
    yield take(DO_FETCH_APP_CONFIG);

    const configVersion = yield select(selectAppConfigVersion);

    const { response, error } = yield fetchAppConfig(
      parseInt(configVersion, 10),
    );

    if (response) {
      const { data: responseData, version } = response;
      const data = {};
      responseData.forEach(item => {
        const { id, key, type, value, description, deletedAt } = item;
        const isDeleted = deletedAt !== null;
        data[key] = { id, type, value, description, isDeleted };
      });
      yield all([put(setAppConfig(data)), put(setAppConfigVersion(version))]);
    } else if (error) {
      yield put(addAppError(error));
    }
  }
}

const updateAppConfig = (id, data) =>
  apiInstance
    .put(`/app-config/${id}`, data)
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* updateAppConfigFlow() {
  while (true) {
    const { payload } = yield take(DO_UPDATE_APP_CONFIG);
    const { id, data } = payload;

    const { error } = yield updateAppConfig(id, data);

    if (error) {
      yield put(addAppError(error));
    }
  }
}

export default [fetchAppConfigFlow, updateAppConfigFlow];
