import { take, select, all, put } from 'redux-saga/effects';
import { api, queryUrl, addAppError } from '@newtash/react-app-core';
import {
  FETCH_ART_GROUPS,
  DO_SAVE_ART_GROUP,
  DO_DELETE_ART_GROUP,
  fetchArtGroups,
  setArtGroupsData,
  setArtGroupsVersion,
} from '../actions';
import { selectArtGroupsVersion } from '../selectors';

const doFetchArtGroups = v =>
  api
    .get(queryUrl('/art-grupa', { v }))
    .then(response => response.data)
    .then(({ data: responseData, version }) => {
      const data = {};
      responseData.forEach(item => {
        const { id, grpNaziv, vArtikl, grpSifra, grpDuzina, deletedAt } = item;
        data[id] = {
          id,
          grpNaziv,
          vArtikl,
          grpSifra,
          grpDuzina,
          isDeleted: deletedAt !== null,
        };
      });
      return { data, version };
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* fetchArtGroupsFlow() {
  while (true) {
    yield take(FETCH_ART_GROUPS);

    const currentVersion = yield select(selectArtGroupsVersion);

    const { response, error } = yield doFetchArtGroups(currentVersion);
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

const getSaveRequest = data =>
  data.id
    ? api.put(`/art-grupa/${data.id}`, data)
    : api.post('/art-grupa', data);

const saveArtGroup = data =>
  getSaveRequest(data)
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* saveArtGroupFlow() {
  while (true) {
    const { payload: data } = yield take(DO_SAVE_ART_GROUP);

    const { error } = yield saveArtGroup(data);

    if (error) {
      yield put(addAppError(error));
    }

    yield put(fetchArtGroups());
  }
}

const deleteArtGroup = id =>
  api
    .delete(`/art-grupa/${id}`)
    .then(response => response.status)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* deleteArtGroupFlow() {
  while (true) {
    const { payload: id } = yield take(DO_DELETE_ART_GROUP);

    const { error } = yield deleteArtGroup(id);

    if (error) {
      yield put(addAppError(error));
    }

    yield put(fetchArtGroups());
  }
}

export default [fetchArtGroupsFlow, saveArtGroupFlow, deleteArtGroupFlow];
