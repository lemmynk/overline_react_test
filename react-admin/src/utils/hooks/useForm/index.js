// @flow
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import useEnv from '../useEnv';
import { USE_FORM_DEFAULT_TIMEOUT_SECS } from '../../../config';

type Props = {
  url: string,
  fields: Array<string>,
  t?: I18nTranslator,
  tDomain?: string,
  saveTimeoutSecs?: number,
  deleteErrorMsg?: string,
};

let saveTimeout;

export default (props: Props) => {
  const { url, fields, t, tDomain, saveTimeoutSecs, deleteErrorMsg } = props;
  const { api } = useApi();
  const { addAppError } = useAppErrors();
  const { error422 } = useEnv();

  const [formData, setFormData] = useState<Object>({});
  const [formChanges, setFormChanges] = useState<Array<string>>([]);
  const [formErrors, setFormErrors] = useState<Object>({});
  const [isSaving, setSaving] = useState<boolean>(false);
  const [isSaved, setSaved] = useState<boolean>(false);

  /*
   |---------------------------------------------------------------------
   | FORM DATA PROPS
   |---------------------------------------------------------------------
   */

  const getPropValue = useCallback(
    (propName: string, defaultsTo: any = null) =>
      formData[propName] || defaultsTo,
    [formData],
  );

  const setPropValueAction = useCallback(
    (propName: string, newValue: any) => {
      setFormData({ ...formData, [propName]: newValue });
      if (!formChanges.includes(propName)) {
        setFormChanges([...formChanges, propName]);
      }
    },
    [formData, setFormData, formChanges, setFormChanges],
  );

  const setPropValue = (propName: string) => (newValue: string) =>
    setPropValueAction(propName, newValue);

  const getPropHasErrors = (propName: string) =>
    formErrors && formErrors[propName] && formErrors[propName].length > 0;

  const clearValidationErrors = () => setFormErrors({});

  const getPropHasChanged = useCallback(
    (propName: string) => formChanges.includes(propName),
    [formChanges],
  );

  /*
   |---------------------------------------------------------------------
   | HELPERS
   |---------------------------------------------------------------------
   */

  /**
   * Include only props defined in fields array
   * to include while fetching the data
   */
  const only = useCallback(
    (data: Object) =>
      fields && fields.length > 0
        ? Object.keys(data)
            .filter(key => fields.includes(key))
            .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
        : data,
    [fields],
  );

  /**
   * Remove id from formData object
   */
  const stripId = useCallback(
    (data: Object) =>
      Object.keys(data)
        .filter(key => key !== 'id')
        .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {}),
    [],
  );

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
        setSaved(false);
      }, timeout);
    }
  }, [isSaved, setSaved, saveTimeoutSecs]);

  /**
   * Translate errors before output
   */
  const translateErrors = useCallback(() => {
    const errors = {};
    if (t && tDomain) {
      Object.keys(formErrors).forEach(key => {
        const errKey = t(`${tDomain}.fields.${key}`);
        const propErrors = formErrors[key];
        const transErrs = propErrors.map(str => t(`${tDomain}.errors.${str}`));
        errors[errKey] = transErrs;
      });
      return errors;
    }
    return formErrors;
  }, [formErrors, t, tDomain]);

  /**
   * memoize translated errors
   */
  const validationErrors = useMemo(() => translateErrors(), [translateErrors]);

  /*
   |---------------------------------------------------------------------
   | CRUD ACTIONS
   |---------------------------------------------------------------------
   */

  /**
   * Load default form data from api
   * @todo: Missing in api
   */
  const initForm = () => {
    // eslint-disable-next-line no-console
    console.log('...do init form...', url);
  };

  /**
   * Fetch form data before showing the form
   */
  const fetchFormData = async (id: number) => {
    try {
      const response = await api.get(`${url}/${id}`);
      const data = await response.data;
      const fData = only(data);
      await setFormData(fData);
      return true;
    } catch (err) {
      await addAppError(err);
      return false;
    }
  };

  const saveRequest = (data: Object) => {
    const { id } = formData;
    return id ? api.put(`${url}/${id}`, data) : api.post(url, data);
  };

  const saveFormData = async () => {
    const body = stripId(formData);

    try {
      await setSaving(true);
      await setSaved(false);
      const response = await saveRequest(body);
      const status = await response.status;
      const data = await response.data;
      const isValid = status !== error422;
      if (isValid) {
        await setFormData({ ...formData, ...data });
        await setSaved(true);
      } else {
        await setFormErrors(data);
      }
      await setSaving(false);
      return isValid;
    } catch (err) {
      await addAppError(err);
      return false;
    }
  };

  const deleteFormData = async () => {
    const { id } = formData;
    try {
      const response = await api.delete(`${url}/${id}`);
      const status = await response.status;
      const isDeleted = status !== error422;
      if (!isDeleted && deleteErrorMsg) {
        await addAppError(deleteErrorMsg);
      }
      return true;
    } catch (err) {
      await addAppError(err);
      return false;
    }
  };

  return {
    formData,
    setFormData,
    formChanges,
    validationErrors,
    clearValidationErrors,
    isSaving,
    isSaved,

    setPropValue,
    getPropValue,
    getPropHasChanged,
    getPropHasErrors,

    initForm,
    fetchFormData,
    saveFormData,
    deleteFormData,
  };
};
