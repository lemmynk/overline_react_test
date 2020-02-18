// @flow
import React, { type Node } from 'react';
import reducer, { initialState } from './reducer';
import {
  setFormData,
  setFormErrors,
  setFormDataPropValue,
  // setFormDataPropChanged,
  // setFormDataPropErrors,
} from './actions';
import {
  selectFormData,
  selectFormErrors,
  // selectFormChanged,
  selectFormDataPropValue,
  // selectFormPropChanged,
  // selectFormHasErrors,
  // selectFormPropErrors,
  selectFormPropHasErrors,
} from './selectors';

type ProviderProps = {
  children: Node,
};

const FormStateContext = React.createContext<any>();
const FormDispatchContext = React.createContext<any>();

const FormProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = React.useReducer<any, any>(reducer, initialState);
  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};

const useFormState = () => {
  const state = React.useContext(FormStateContext);
  const dispatch = React.useContext(FormDispatchContext);
  if (state === undefined) {
    throw new Error('useFormState must be used within FormProvider');
  }

  const dispatchSetFormData = React.useCallback(
    (data: Object) => dispatch(setFormData(data)),
    [dispatch],
  );

  const dispatchSetFormErrors = React.useCallback(
    (errors: Object) => dispatch(setFormErrors(errors)),
    [dispatch],
  );

  const setPropValue = (propName: string) => (newValue: any) =>
    dispatch(setFormDataPropValue(propName, newValue));

  const getPropValue = React.useCallback(
    (propName: string) => selectFormDataPropValue(state, propName),
    [state],
  );

  const getPropHasErrors = React.useCallback(
    (propName: string) => selectFormPropHasErrors(state, propName),
    [state],
  );

  return {
    // state,
    setFormData: dispatchSetFormData,
    formData: selectFormData(state),

    setPropValue,
    getPropValue,
    getPropHasErrors,

    setFormErrors: dispatchSetFormErrors,
    errors: selectFormErrors(state),
  };
};

const useFormDispatch = () => {
  const context = React.useContext(FormDispatchContext);
  if (context === undefined) {
    throw new Error('useFormDispatch must be used within FormProvider');
  }
  return context;
};

export { FormProvider, useFormState, useFormDispatch };
