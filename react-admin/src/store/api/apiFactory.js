// https://www.npmjs.com/package/axios
// https://medium.com/@mateioprea/maintaining-api-authentication-using-axios-e70ba174da6
import axios from 'axios';
import { selectAuth } from '../selectors';
import { doRefreshToken } from '../actions';
import {
  RENEW_TIMEOUT_BUFFER,
  MAX_TIMEOUT_INTERVAL,
  RESPONSE_STATUS_UNPROCESSABLE_ENTITY,
} from '../../config';

let storeInstance;

const {
  REACT_APP_AUTH_URL,
  REACT_APP_API_URL,
  REACT_APP_TIMEOUT,
} = process.env;

const baseHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

const apiConfig = {
  baseURL: REACT_APP_API_URL,
  timeout: REACT_APP_TIMEOUT,
  headers: baseHeaders,
};

const authApiConfig = {
  baseURL: REACT_APP_AUTH_URL,
  timeout: REACT_APP_TIMEOUT,
  headers: baseHeaders,
};

/*
 |------------------------------------------------------------------------------
 | ERROR HANDLER
 |------------------------------------------------------------------------------
 */
export const handleError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log('Data:', error.response.data);
    // console.log('Status', error.response.status);
    // console.log('Headers:', error.response.headers);

    const { data: responseData, status } = error.response;
    const { error: responseError } = responseData;

    if (responseError) {
      return `${status} - ${responseError}`;
    }
    if (typeof responseData === 'object') {
      return `${status} - ${JSON.stringify(responseData)}`;
    }
    return `${status} - ${error.response.data.error}`;
  }
  if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log('Request:', error.request);

    return 'No response retrieved';
  }
  // Something happened in setting up the request that triggered an Error
  // console.log('Error:', error.message);

  return error.message;
};

/*
 |------------------------------------------------------------------
 | API INSTANCES
 |------------------------------------------------------------------
 */
export const simpleApiInstance = axios.create(apiConfig);
export const apiInstance = axios.create(apiConfig);
export const authApiInstance = axios.create(authApiConfig);

const authApiInterceporFactory = store => {
  authApiInstance.interceptors.request.use(
    config => {
      const { withAuth } = config;
      if (withAuth) {
        const state = store.getState();
        const { accessToken } = selectAuth(state);

        const headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        return { ...config, headers };
      }
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    },
  );
  // Add a response interceptor
  authApiInstance.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    responseError => {
      const error = handleError(responseError);
      return Promise.reject(error);
    },
  );
};

const apiInterceptorFactory = store => {
  // Add a request interceptor
  apiInstance.interceptors.request.use(
    config => {
      const state = store.getState();
      const { accessToken } = selectAuth(state);

      const headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      return { ...config, headers };
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    },
  );
  // Add a response interceptor
  apiInstance.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    responseError => {
      const { response } = responseError;
      if (
        response &&
        response.status &&
        response.status === RESPONSE_STATUS_UNPROCESSABLE_ENTITY
      ) {
        return Promise.resolve(response);
      }
      const error = handleError(responseError);
      return Promise.reject(error);
    },
  );
};

/*
 |------------------------------------------------------------------
 | REFRESH TOKEN TIMEOUT
 |------------------------------------------------------------------
 */
let refreshTokenTimeout;
export const dispatchRenewTokenIn = expiresInSecs => {
  const timeoutSecs = Math.min(
    MAX_TIMEOUT_INTERVAL,
    expiresInSecs - RENEW_TIMEOUT_BUFFER,
  );

  if (refreshTokenTimeout) {
    clearTimeout(refreshTokenTimeout);
  }
  refreshTokenTimeout = setTimeout(() => {
    storeInstance.dispatch(doRefreshToken());
  }, timeoutSecs * 1000);
};

/*
 |------------------------------------------------------------------
 | FACTORY
 |------------------------------------------------------------------
 */
export const apiFactory = store => {
  storeInstance = store;
  authApiInterceporFactory(store);
  apiInterceptorFactory(store);
};
