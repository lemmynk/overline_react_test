// @flow
import { useReducer, useEffect } from 'react';
import reducer from './reducer';
import { setFormData, setFormDataPropValue } from './actions';
import { selectFormDataPropValue } from './selectors';

const initialState = {};

export default (lazyInitalData: Object) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    () => lazyInitalData,
  );

  useEffect(() => {
    dispatch(setFormData(lazyInitalData));
  }, [lazyInitalData]);

  const getPropValue = (propName: string, defaultsTo: any = null) =>
    selectFormDataPropValue(state, propName, defaultsTo);

  const setPropValue = (propName: string) => (newValue: any) => {
    dispatch(setFormDataPropValue(propName, newValue));
  };

  return {
    formData: state,

    getPropValue,
    setPropValue,
  };
};
