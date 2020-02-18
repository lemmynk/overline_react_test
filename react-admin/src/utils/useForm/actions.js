export const SET_FORM_DATA = 'SET_FORM_DATA';

export const SET_FORM_DATA_PROP_VALUE = 'SET_FORM_DATA_PROP_VALUE';
export const SET_FORM_DATA_PROP_CHANGED = 'SET_FORM_DATA_PROP_CHANGED';
export const SET_FORM_DATA_PROP_ERRORS = 'SET_FORM_DATA_PROP_ERRORS';

export const setFormDataAction = formData => ({
  type: SET_FORM_DATA,
  payload: formData,
});

export const setFormDataPropValueAction = (propName, newValue) => ({
  type: SET_FORM_DATA_PROP_VALUE,
  propName,
  payload: newValue,
});
