import { take, all, put, select } from 'redux-saga/effects';
import {
  DO_AUTHENTICATION,
  DO_REFRESH_TOKEN,
  DO_WHO_AM_I_REQUEST,
  setAccessToken,
  setRefreshToken,
  setExpiresAt,
  doWhoAmI,
  doInitApp,
  setWhoAmI,
  addAppError,
} from '../actions';
import { selectRefreshToken } from '../selectors';
import { authApiInstance, dispatchRenewTokenIn } from '../api';
import { buildChallenge, encryptSync, expiresAt } from '../../utils';

/*
 |------------------------------------------------------------------------------
 | AUTHORIZE
 |------------------------------------------------------------------------------
 */
function* setAuth(auth) {
  const { accessToken, refreshToken, expiresIn } = auth;
  yield all([
    put(setAccessToken(accessToken)),
    put(setRefreshToken(refreshToken)),
    put(setExpiresAt(expiresAt(expiresIn))),
  ]);
}

const makeAuthRequest = code => {
  const { verifier, challenge } = buildChallenge();
  const authorizeData = { code, challenge };

  return authApiInstance
    .post('/authorize', authorizeData)
    .then(response => response.data)
    .then(response => ({
      ...response,
      verifier: encryptSync(verifier),
    }))
    .then(tokenData => authApiInstance.post('/token', tokenData))
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

function* authenticationFlow() {
  while (true) {
    const action = yield take(DO_AUTHENTICATION);
    const { payload: handshakeCode } = action;

    const { response, error } = yield makeAuthRequest(handshakeCode);

    if (response) {
      const { expiresIn } = response;
      yield setAuth(response);
      yield all([put(doWhoAmI()), put(doInitApp())]);

      dispatchRenewTokenIn(expiresIn);
    } else if (error) {
      yield put(addAppError(error));
    }
  }
}

/*
 |------------------------------------------------------------------------------
 | RENEW TOKEN
 |------------------------------------------------------------------------------
 */
const makeRenewTokenRequest = refreshToken =>
  authApiInstance
    .post('/renew', { refreshToken })
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* renewTokenRequestFlow() {
  while (true) {
    yield take(DO_REFRESH_TOKEN);

    const currentRefreshToken = yield select(selectRefreshToken);

    if (currentRefreshToken) {
      const { response, error } = yield makeRenewTokenRequest(
        currentRefreshToken,
      );

      if (response) {
        const { expiresIn } = response;
        yield setAuth(response);

        dispatchRenewTokenIn(expiresIn);
      }
      if (error) {
        yield put(addAppError(error));
      }
    }
  }
}

/*
 |------------------------------------------------------------------------------
 | WHO AM I
 |------------------------------------------------------------------------------
 */

const makeWhoAmIRequest = () =>
  authApiInstance
    .request({ method: 'post', url: '/whoami', withAuth: true })
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* whoAmIRequestFlow() {
  while (true) {
    yield take(DO_WHO_AM_I_REQUEST);

    const { response, error } = yield makeWhoAmIRequest();

    if (response) {
      yield put(setWhoAmI(response));
    }
    if (error) {
      yield put(addAppError(error));
    }
  }
}

export default [authenticationFlow, renewTokenRequestFlow, whoAmIRequestFlow];
