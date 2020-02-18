// @flow
import { useState, useEffect, useCallback, useMemo } from 'react';

export default (
  initalData: Object,
  validationErrors: Object = {},
  t: ?I18nTranslator = null,
) => {
  const [data, setData] = useState(initalData);
  const [errs, setErrors] = useState(validationErrors);
  const [changes, setChanges] = useState([]);

  /**
   * Store data change with clearing changes
   */
  useEffect(() => {
    // console.log('### initalData effect', initalData);
    setData(initalData);
    setChanges([]);
  }, [initalData, setData, setChanges]);

  /**
   * Translate errors before storing
   */
  useEffect(() => {
    // console.log('### validationErrors effect', validationErrors);
    if (t) {
      const translatedErrors = {};
      Object.keys(validationErrors).forEach(key => {
        const propErrors = validationErrors[key];
        const transErrs = propErrors.map(e => t(e));
        translatedErrors[key] = transErrs;
      });
      setErrors(translatedErrors);
    } else {
      setErrors(validationErrors);
    }
  }, [validationErrors, setErrors, t]);

  /*
   |---------------------------------------------------------------------------------
   | MEMOIZED VALUES
   |---------------------------------------------------------------------------------
   */
  const formData = useMemo(() => data, [data]);
  const errors = useMemo(() => errs, [errs]);
  const hasErrors = useMemo(() => errors && Object.keys(errors).length > 0, [
    errors,
  ]);
  const propChanges = useMemo(() => changes, [changes]);

  /*
   |---------------------------------------------------------------------------------
   | HOOK METHODS
   |---------------------------------------------------------------------------------
   */
  const setPropValueAction = useCallback(
    (propName: string, newValue: any) => {
      setData({ ...data, [propName]: newValue });
      if (!changes.includes(propName)) {
        setChanges([...changes, propName]);
      }
    },
    [data, setData, changes, setChanges],
  );

  const setPropValue = (propName: string) => (newValue: string) =>
    setPropValueAction(propName, newValue);

  const getPropValue = useCallback(
    (propName: string, defaultsTo: any = null) =>
      formData[propName] || defaultsTo,
    [formData],
  );

  const getPropHasErrors = useCallback(
    (propName: string) => {
      return errors[propName] && errors[propName].length > 0;
    },
    [errors],
  );

  const getPropHasChanged = useCallback(
    (propName: string) => propChanges.includes(propName),
    [propChanges],
  );

  return {
    formData,
    errors,
    hasErrors,
    changes,

    setPropValueAction,
    setPropValue,
    getPropValue,
    getPropHasErrors,
    getPropHasChanged,
  };
};
