// @flow
import { useState, useCallback } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
// import { reducer, initialState } from './reducer';

type Props = {
  url: string,
  fields: Array<string>,
};

const { REACT_APP_RESPONSE_STATUS_UNPROCESSABLE_ENTITY } = process.env;

const unprocessableEntityErrorStatus = parseInt(
  REACT_APP_RESPONSE_STATUS_UNPROCESSABLE_ENTITY || '422',
  10,
);

export default (props: Props) => {
  const { url, fields } = props;
  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const [formData, setFormData] = useState<Object>({});
  const [validationErrors] = useState<Object>({});

  /*
   |---------------------------------------------------------------------
   | FORM DATA PROPS
   |---------------------------------------------------------------------
   */

  const getPropValue = (propName: string, defaultsTo: any = null) =>
    formData[propName] || defaultsTo;

  const setPropValue = (propName: string) => (newValue: any) => {
    setFormData({
      ...formData,
      [propName]: newValue,
    });
  };

  const getPropHasErrors = (propName: string) =>
    validationErrors &&
    validationErrors[propName] &&
    validationErrors[propName].length > 0;

  /*
   |---------------------------------------------------------------------
   | CRUD ACTIONS
   |---------------------------------------------------------------------
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

  const stripId = useCallback(
    (data: Object) =>
      Object.keys(data)
        .filter(key => key !== 'id')
        .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {}),
    [],
  );

  const initForm = () => {
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
      const response = await saveRequest(body);
      const status = await response.status;
      const data = await response.data;
      console.log('response:', status, data);
      // Handle 422 errors here
      return status !== unprocessableEntityErrorStatus;
    } catch (err) {
      await addAppError(err);
      return false;
    }
  };

  return {
    formData,
    validationErrors,
    setFormData,

    getPropValue,
    setPropValue,
    getPropHasErrors,

    initForm,
    fetchFormData,
    saveFormData,
  };
};
