// @flow
import React from 'react';
import { TextInput } from '@newtash/core/Input';
import { FormErrorsBox, SaveCancelFooter } from '../components';
import useForm from './useForm';

type Props = {
  fetching: boolean,
  data: Object,
  validationErrors: Object,
  clearValidationErrors: () => void,
  onDismiss: () => void,
  saveForm: (Object, SaveCallback) => void,
};

export default (props: Props) => {
  const {
    fetching,
    data,
    validationErrors,
    clearValidationErrors,
    onDismiss,
    saveForm,
  } = props;

  const form = useForm(data);
  const { formData, getPropValue, setPropValue } = form;

  const saveCallback = (err: Object, response: Object) => {
    console.log('saveCallback:', err, response);
    // setTimeout(() => {
    //   clearValidationErrors();
    // }, 1000);
    if (!err && onDismiss) {
      onDismiss();
    }
  };

  const handleSaveClick = () => {
    if (saveForm) {
      saveForm(formData, saveCallback);
    }
  };

  return (
    <>
      <FormErrorsBox
        errors={validationErrors}
        onClear={clearValidationErrors}
      />
      <TextInput
        label="grpSifra"
        value={getPropValue('grpSifra')}
        onChange={setPropValue('grpSifra')}
      />
      <TextInput
        label="grpNaziv"
        value={getPropValue('grpNaziv')}
        onChange={setPropValue('grpNaziv')}
      />
      {/* <pre>{JSON.stringify({ formData }, null, 2)}</pre> */}
      <SaveCancelFooter
        fetching={fetching}
        onCancel={onDismiss}
        onSave={handleSaveClick}
      />
    </>
  );
};
