import { take, all, put, delay } from 'redux-saga/effects';
import {
  DO_INIT_FORM,
  DO_SAVE_FORM,
  setFormFetching,
  setFormErrors,
  clearFormErrors,
} from '../actions';

function* doInitFormFlow() {
  while (true) {
    const action = yield take(DO_INIT_FORM);

    console.log('...do init form ...', action);
  }
}

function* doSaveFormFlow() {
  while (true) {
    const action = yield take(DO_SAVE_FORM);
    const { payload, callback } = action;

    yield all([put(setFormFetching(true)), put(clearFormErrors())]);

    console.log('...do save form...', action);

    yield delay(1000);

    if (false) {
      yield put(
        setFormErrors({
          grpNaziv: ['error.length', 'error.required'],
        }),
      );
    }

    if (callback) {
      // setTimeout(() => {
      // callback('Ooops. Something went wrong', null);
      // callback(200|422|500, { id: payload.id });
      callback(undefined, { id: payload.id });
      // }, 10000);
    }
    yield put(setFormFetching(false));
  }
}

export default [doInitFormFlow, doSaveFormFlow];
