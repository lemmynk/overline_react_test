// @flow
import { useReducer, useEffect } from 'react';
import reducer from './reducer';
// import {
//   setFormData,
//   setFormErrors,
//   setFormDataPropValue,
//   setFormDataPropChanged,
//   setFormDataPropErrors,
// } from './actions';
// import {
//   selectFormData,
//   selectFormChanged,
//   selectFormHasErrors,
//   selectFormDataPropValue,
//   selectFormPropChanged,
//   selectFormPropErrors,
//   selectFormPropHasErrors,
// } from './selectors';

const initialState = {};

export default (initalData: Object, validationErrors: Object = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => initalData);

  useEffect(() => {
    console.log('### initalData effect', initalData);
    // dispatch(setFormData(initalData));
  }, [initalData]);

  useEffect(() => {
    console.log('### validationErrors effect', validationErrors);
    // dispatch(setFormErrors(validationErrors));
  }, [validationErrors]);

  // const getPropValue = (propName: string, defaultsTo: any = null) =>
  //   selectFormDataPropValue(state, propName, defaultsTo);

  // const setPropValue = (propName: string) => (newValue: any) => {
  //   dispatch(setFormDataPropValue(propName, newValue));
  // };

  // const getFormChanged = () => selectFormChanged(state);

  // const getPropChanged = (propName: string) =>
  //   selectFormPropChanged(state, propName);

  // const setPropChanged = (propName: string) => (changed: boolean) => {
  //   dispatch(setFormDataPropChanged(propName, changed));
  // };

  // const getFormHasErrors = () => selectFormHasErrors(state);

  // const getPropHasErrors = (propName: string) =>
  //   selectFormPropHasErrors(state, propName);

  // const getPropErrors = (propName: string) =>
  //   selectFormPropErrors(state, propName);

  // const setPropErrors = (propName: string, errors: Array<string>) => {
  //   dispatch(setFormDataPropErrors(propName, errors));
  // };

  return {
    // state,
    // formData: selectFormData(state),
    // setPropValue,
    // getPropValue,
    // isChanged: getFormChanged(),
    // getFormChanged,
    // setPropChanged,
    // getPropChanged,
    // hasErrors: getFormHasErrors(),
    // getFormHasErrors,
    // setPropErrors,
    // getPropHasErrors,
    // getPropErrors,
  };
};
