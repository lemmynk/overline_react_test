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

/**
 *  isFetching:
 *    - flag fetching in progress
 *  isSaving:
 *    - flag saving in progress -> set Save button to disable/fetching
 *  isSaved:
 *    - flag saved for specified time -> set Success mark on/off
 */
export default (props: Props) => {
  const { url, fields, t, tDomain, saveTimeoutSecs, deleteErrorMsg } = props;
  const { api } = useApi();
  const { addAppError } = useAppErrors();
  const { error422 } = useEnv();

  const [fetchUrl, setFetchUrl] = useState<string>('');
  const [formData, setFormData] = useState<Object>({});
  const [formChanges, setFormChanges] = useState<Array<string>>([]);
  const [formErrors, setFormErrors] = useState<Object>({});
  const [isFetching, setFetching] = useState<boolean>(false);
  const [isSaving, setSaving] = useState<boolean>(false);
  const [isSaved, setSaved] = useState<boolean>(false);

  /*
   |---------------------------------------------------------------------
   | FORM DATA PROPS
   |---------------------------------------------------------------------
   */

  /**
   * Clear formData
   */
  const clearFormData = useCallback(() => setFormData({}), [setFormData]);

  /**
   * Get formData prop value
   *
   * @param   {String}  propName
   * @param   {Any}     defaultsTo
   * @return  {Any}
   */
  const getPropValue = useCallback(
    (propName: string, defaultsTo: any = null) =>
      formData[propName] || defaultsTo,
    [formData],
  );

  /**
   * Set formData prop Value action
   *
   * @param   {String}  propName
   * @param   {Any}     newValue
   * @return  {Void}
   */
  const setPropValueAction = useCallback(
    (propName: string, newValue: any) => {
      setFormData({ ...formData, [propName]: newValue });
      if (!formChanges.includes(propName)) {
        setFormChanges([...formChanges, propName]);
      }
    },
    [formData, setFormData, formChanges, setFormChanges],
  );

  /**
   * Set formData prop Value function to be used by form controls
   *
   * @param   {String}  propName
   * @param   {Any}     newValue
   * @return  {Void}
   */
  const setPropValue = (propName: string) => (newValue: string) =>
    setPropValueAction(propName, newValue);

  /**
   * Will return does prop has validation errors
   *
   * @param   {String}  propName
   * @return  {Boolean}
   */
  const getPropHasErrors = (propName: string) =>
    formErrors && formErrors[propName] && formErrors[propName].length > 0;

  /**
   * Will clear all validation errors
   */
  const clearValidationErrors = useCallback(() => setFormErrors({}), [
    setFormErrors,
  ]);

  /**
   * Will return is formData prop has changed
   *
   * @param   {String}  propName
   * @return  {Boolean}
   */
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
   * Fetch/Init form data before showing the form
   *
   * @param {String} withUrl
   * @return {Boolean}
   */
  const fetchFormData = useCallback(
    async (withUrl: string) => {
      await setFetchUrl('');
      await setFetching(true);
      try {
        const response = await api.get([url, withUrl].join(''));
        const data = await response.data;
        const fData = only(data);
        await setFormData(fData);
        await setFetching(false);
        return true;
      } catch (err) {
        await addAppError(err);
        await setFetching(false);
        return false;
      }
    },
    [api, url, only, addAppError, setFetchUrl, setFetching],
  );

  /**
   * DoFetch trigger function
   *  - set the fetchUrl to trigger fetchUrl effect,
   *  - fetchUrl effect will fire formData fetching
   *
   * @param {String} withUrl
   * @return {Void}
   */
  const doFetchUrl = useCallback(
    (withUrl: string) => {
      setFetchUrl(withUrl);
    },
    [setFetchUrl],
  );

  /**
   * FetchUrl effect scans fetchUrl string changes
   * - fire formData fetching function
   * Done this way in order to escape cirular loops
   * with so many dependencies
   */
  useEffect(() => {
    if (fetchUrl && fetchUrl.length > 0) {
      fetchFormData(fetchUrl);
    }
  }, [fetchUrl, fetchFormData]);

  /**
   * Resolve request type [post|put]
   * according the formData
   *
   * @return {Promise}
   */
  const saveRequest = (data: Object) => {
    const { id } = formData;
    return id ? api.put(`${url}/${id}`, data) : api.post(url, data);
  };

  /**
   * Do send request to save formData
   *
   * @return {Boolean}
   */
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

  /**
   * Do send request to delete formData
   *
   * @return {Boolean}
   */
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
    isFetching,
    isSaving,
    isSaved,

    setPropValue,
    getPropValue,
    getPropHasChanged,
    getPropHasErrors,
    clearFormData,
    clearValidationErrors,

    doFetchUrl,
    saveFormData,
    deleteFormData,
  };
};
