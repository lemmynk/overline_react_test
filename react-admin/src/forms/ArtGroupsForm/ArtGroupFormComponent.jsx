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

  // const form = useForm(data, validationErrors);
  const {
    state,
    formData,
    getPropValue,
    setPropValue,
    getPropHasErrors,
  } = useForm(data, validationErrors);

  const saveCallback = (status: number, response: Object) => {
    console.log('saveCallback:', status, response);
    // setTimeout(() => {
    //   clearValidationErrors();
    // }, 1000);
    // if (!err && onDismiss) {
    //   onDismiss();
    // }
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
        hasErrors={getPropHasErrors('grpSifra')}
      />
      <TextInput
        label="grpNaziv"
        value={getPropValue('grpNaziv')}
        onChange={setPropValue('grpNaziv')}
        hasErrors={getPropHasErrors('grpNaziv')}
      />
      <pre>{JSON.stringify({ formData, state }, null, 2)}</pre>
      <SaveCancelFooter
        fetching={fetching}
        onCancel={onDismiss}
        onSave={handleSaveClick}
      />
    </>
  );
};
