import { NS } from '../reduxState';

export const ADD_APP_ERROR = `${NS}/ADD_APP_ERROR`;
export const CLEAR_APP_ERRORS = `${NS}/CLEAR_APP_ERRORS`;

export const addAppError = errorMessage => ({
  type: ADD_APP_ERROR,
  payload:
    typeof errorMessage === 'object'
      ? errorMessage.message || JSON.stringify(errorMessage)
      : errorMessage,
});

export const clearAppErrors = () => ({
  type: CLEAR_APP_ERRORS,
});
