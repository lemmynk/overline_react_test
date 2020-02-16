import reduxState from '../reduxState';

const { FORM } = reduxState;

export const selectFormData = state => state[FORM].data;
export const selectFormDataFetching = state => state[FORM].dataFetching;
export const selectFormFetching = state => state[FORM].fetching;
export const selectFormErrors = state => state[FORM].errors;
