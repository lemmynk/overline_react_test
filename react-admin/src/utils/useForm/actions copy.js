export const SET_FORM_DATA = 'SET_FORM_DATA';
export const SET_FORM_ERRORS = 'SET_FORM_ERRORS';

export const SET_FORM_DATA_PROP_VALUE = 'SET_FORM_DATA_PROP_VALUE';
export const SET_FORM_DATA_PROP_CHANGED = 'SET_FORM_DATA_PROP_CHANGED';
export const SET_FORM_DATA_PROP_ERRORS = 'SET_FORM_DATA_PROP_ERRORS';

export const setFormData = formData => ({
  type: SET_FORM_DATA,
  payload: formData,
});

export const setFormErrors = errors => ({
  type: SET_FORM_ERRORS,
  payload: errors,
});

export const setFormDataPropValue = (propName, newValue) => ({
  type: SET_FORM_DATA_PROP_VALUE,
  key: propName,
  payload: newValue,
});

export const setFormDataPropChanged = (propName, changed) => ({
  type: SET_FORM_DATA_PROP_CHANGED,
  key: propName,
  payload: !!changed,
});

export const setFormDataPropErrors = (propName, errors) => ({
  type: SET_FORM_DATA_PROP_CHANGED,
  key: propName,
  payload: errors,
});
