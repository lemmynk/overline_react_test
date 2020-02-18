export const selectFormData = state => state.data;
export const selectFormErrors = state => state.errors;

export const selectFormChanged = state =>
  Object.keys(state).reduce(
    (acc, val) => acc || (state[val] ? !!state[val].isChanged : false),
    false,
  );

export const selectFormDataPropValue = (state, key, defaultsTo) => {
  const data = selectFormData(state);
  return data && data[key] ? data[key] || defaultsTo : defaultsTo;
};

// export const selectFormPropChanged = (state, key) =>
//   state[key] ? !!state[key].isChanged : false;

export const selectFormHasErrors = state =>
  Object.keys(state).reduce(
    (acc, val) =>
      acc + (state[val] && state[val].errors ? state[val].errors.length : 0),
    0,
  ) > 0;

export const selectFormPropErrors = (state, key) => {
  const errors = selectFormErrors(state);
  return errors && errors[key] ? errors[key] : [];
};

export const selectFormPropHasErrors = (state, key) => {
  const errors = selectFormPropErrors(state, key);
  return errors && errors.length > 0;
};
