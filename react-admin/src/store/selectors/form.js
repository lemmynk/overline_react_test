import reduxState from '../reduxState';

const { FORM } = reduxState;

export const selectFormData = state => state[FORM].data;
export const selectFormFetching = state => state[FORM].fetching;
export const selectFormErrors = state => state[FORM].errors;
