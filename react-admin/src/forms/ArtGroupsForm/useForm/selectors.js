// eslint-disable-next-line import/prefer-default-export
export const selectFormDataPropValue = (state, key, defaultsTo) =>
  state[key] || defaultsTo;
