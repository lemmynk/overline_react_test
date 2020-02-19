// @flow
import { useState, useEffect, useCallback, useMemo } from 'react';
import { USE_FORM_DEFAULT_TIMEOUT_SECS } from '../../config';

type Params = {
  t?: I18nTranslator,
  tDomain?: string,
  saveTimeoutSecs?: number,
};

let saveTimeout;

export default (
  initialData: Object,
  validationErrors: Object = {},
  params?: Params = {},
) => {
  const { t, tDomain, saveTimeoutSecs } = params;
  const [data, setData] = useState(initialData || {});
  const [errs, setErrors] = useState(validationErrors || {});
  const [changes, setChanges] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  /**
   * Store data change with clearing changes
   */
  useEffect(() => {
    // console.log('### initialData effect', initialData);
    if (initialData) {
      setData(initialData);
      setChanges([]);
    }
  }, [initialData, setData, setChanges]);

  /**
   * Clear timeout (if any) on close
   */
  useEffect(() => {
    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, []);

  /**
   * Translate errors before storing
   */
  useEffect(() => {
    // console.log('### validationErrors effect', validationErrors);
    setErrors(validationErrors);
  }, [validationErrors, setErrors]);

  /**
   * Fired when the form is successfuly saved
   */
  useEffect(() => {
    const timeout =
      parseInt(saveTimeoutSecs || USE_FORM_DEFAULT_TIMEOUT_SECS, 10) * 1000;

    if (isSaved) {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      saveTimeout = setTimeout(() => {
        setIsSaved(false);
      }, timeout);
    }
  }, [isSaved, setIsSaved, saveTimeoutSecs]);

  const translateErrors = useCallback(() => {
    const errors = {};
    if (t && tDomain) {
      Object.keys(errs).forEach(key => {
        const errKey = t(`${tDomain}.fields.${key}`);
        const propErrors = errs[key];
        const transErrs = propErrors.map(str => t(`${tDomain}.errors.${str}`));
        errors[errKey] = transErrs;
      });
      return errors;
    }
    return errs;
  }, [errs, t, tDomain]);

  /*
   |---------------------------------------------------------------------------------
   | MEMOIZED VALUES
   |---------------------------------------------------------------------------------
   */
  const formData = useMemo(() => data, [data]);
  const errors = useMemo(() => translateErrors(), [translateErrors]);
  const hasErrors = useMemo(() => errs && Object.keys(errs).length > 0, [errs]);
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

  const getHasProp = useCallback(
    (propName: string) =>
      Object.keys(formData).includes(propName) &&
      typeof formData[propName] !== 'undefined' &&
      formData[propName] !== null,
    [formData],
  );

  const getPropValue = useCallback(
    (propName: string, defaultsTo: any = null) =>
      typeof formData === 'object' && formData[propName]
        ? formData[propName] || defaultsTo
        : defaultsTo,
    [formData],
  );

  const getPropHasErrors = useCallback(
    (propName: string) => {
      return (
        typeof errors === 'object' &&
        errors[propName] &&
        errors[propName].length > 0
      );
    },
    [errors],
  );

  const getPropHasChanged = useCallback(
    (propName: string) => propChanges.includes(propName),
    [propChanges],
  );

  const setSaved = () => {
    setIsSaved(true);
  };

  return {
    formData,
    errors,
    hasErrors,
    changes,
    isSaved,

    setPropValueAction,
    setPropValue,
    getHasProp,
    getPropValue,
    getPropHasErrors,
    getPropHasChanged,
    setSaved,
  };
};
