export const SET_FORM_DATA = 'SET_FORM_DATA';
export const SET_FORM_DATA_PROP_VALUE = 'SET_FORM_DATA_PROP_VALUE';

export const setFormData = formData => ({
  type: SET_FORM_DATA,
  payload: formData,
});

export const setFormDataPropValue = (propName, newValue) => ({
  type: SET_FORM_DATA_PROP_VALUE,
  key: propName,
  payload: newValue,
});
