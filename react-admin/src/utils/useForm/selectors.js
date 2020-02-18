export const selectFormData = state =>
  Object.keys(state).reduce(
    (acc, val) => ({ ...acc, [val]: state[val].value }),
    {},
  );

export const selectFormChanged = state =>
  Object.keys(state).reduce(
    (acc, val) => acc || (state[val] ? !!state[val].isChanged : false),
    false,
  );

export const selectFormDataPropValue = (state, key, defaultsTo) =>
  state[key] ? state[key].value || defaultsTo : defaultsTo;

export const selectFormPropChanged = (state, key) =>
  state[key] ? !!state[key].isChanged : false;

export const selectFormHasErrors = state =>
  Object.keys(state).reduce(
    (acc, val) =>
      acc + (state[val] && state[val].errors ? state[val].errors.length : 0),
    0,
  ) > 0;

export const selectFormPropErrors = (state, key) =>
  state[key] ? state[key].errors : [];

export const selectFormPropHasErrors = (state, key) =>
  selectFormPropErrors(state, key).length > 0;
