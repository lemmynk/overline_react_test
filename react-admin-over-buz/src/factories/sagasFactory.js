import { all, call } from 'redux-saga/effects';
// import libSagas from '../store/sagas';
const libSagas = [];

const sagasFactory = appSagas => {
  let sagas = libSagas;
  if (appSagas) {
    sagas = [...sagas, ...appSagas];
  }
  return function* rootSaga() {
    yield all(sagas.map(saga => call(saga)));
  };
};

export default sagasFactory;
