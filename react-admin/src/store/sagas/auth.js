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
import { buildChallenge, encryptSync, isWithApi, expiresAt } from '../../utils';

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

function* doOfflineAuthentication() {
  const expiresIn10Mins = expiresAt(10 * 60);

  yield all([
    put(setAccessToken('accessToken')),
    put(setRefreshToken('refreshToken')),
    put(setExpiresAt(expiresIn10Mins)),
    put(doWhoAmI()),
    put(doInitApp()),
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

    const offline = !isWithApi();

    if (offline) {
      yield doOfflineAuthentication();
    } else {
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

function* doOfflineWhoAmI() {
  yield put(
    setWhoAmI({
      id: 1,
      username: 'pera',
      firstName: 'Pera',
      lastName: 'Zdera',
      email: 'pera@zdera.com',
      loginAttempts: 0,
      loginAttemptAt: null,
    }),
  );
}

const makeWhoAmIRequest = () =>
  authApiInstance
    .request({ method: 'post', url: '/whoami', withAuth: true })
    .then(response => response.data)
    .then(response => ({ response }))
    .catch(error => ({ error }));

function* whoAmIRequestFlow() {
  while (true) {
    yield take(DO_WHO_AM_I_REQUEST);

    const offline = !isWithApi();
    if (offline) {
      yield doOfflineWhoAmI();
    } else {
      const { response, error } = yield makeWhoAmIRequest();

      if (response) {
        yield put(setWhoAmI(response));
      }
      if (error) {
        yield put(addAppError(error));
      }
    }
  }
}

export default [authenticationFlow, renewTokenRequestFlow, whoAmIRequestFlow];
