import { take, select, all, put } from 'redux-saga/effects';
import { api, queryUrl, addAppError } from '@newtash/react-app-core';
import {
  FETCH_ART_GROUPS,
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

export default [fetchArtGroupsFlow];
