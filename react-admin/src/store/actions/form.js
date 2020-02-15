import { NS } from '../reduxState';

export const DO_INIT_FORM = `${NS}/DO_INIT_FORM`;
export const DO_SAVE_FORM = `${NS}/DO_SAVE_FORM`;
export const DO_DELETE_FORM = `${NS}/DO_DELETE_FORM`;
export const SET_FORM_DATA = `${NS}/SET_FORM_DATA`;
export const SET_FORM_FETCHING = `${NS}/SET_FORM_FETCHING`;
export const SET_FORM_ERRORS = `${NS}/SET_FORM_ERRORS`;
export const CLEAR_FORM_ERRORS = `${NS}/CLEAR_FORM_ERRORS`;

export const initForm = data => ({
  type: DO_INIT_FORM,
  payload: data,
});

export const saveForm = (payload, callback) => ({
  type: DO_SAVE_FORM,
  payload,
  callback,
});

export const deleteForm = (payload, callback) => ({
  type: DO_DELETE_FORM,
  payload,
  callback,
});

export const setFormData = data => ({
  type: SET_FORM_DATA,
  payload: data,
});

export const setFormFetching = fetching => ({
  type: SET_FORM_FETCHING,
  payload: !!fetching,
});

export const setFormErrors = errors => ({
  type: SET_FORM_ERRORS,
  payload: errors,
});

export const clearFormErrors = () => ({
  type: CLEAR_FORM_ERRORS,
});
