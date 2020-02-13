// @flow
import React from 'react';
import {
  ModalHeader,
  ModalBody,
  FormSaveCancelFooter,
} from '@newtash/core/Modal';
import { TextInput } from '@newtash/core/Input';
import FormErrorsBox from '@newtash/core/FormErrorsBox';
import { useForm } from '@newtash/core/hooks';
import { RESPONSE_STATUS_UNPROCESSABLE_ENTITY } from '../../config';

type Props = {
  fetching: boolean,
  data: Object,
  validationErrors: Object,
  clearValidationErrors: () => void,
  onDismiss: () => void,
  saveForm: (string, Object, SaveCallback) => void,
  fetchArtGroups: () => void,
};

export default (props: Props) => {
  const {
    fetching,
    data,
    validationErrors,
    clearValidationErrors,
    onDismiss,
    saveForm,
    fetchArtGroups,
  } = props;

  const { formData, getPropValue, setPropValue, getPropHasErrors } = useForm(
    data,
    validationErrors,
  );

  const doDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  const saveCallback = (response: AxiosResponseProps) => {
    // console.log('saveCallback:', response);
    const { status } = response;
    if (status !== RESPONSE_STATUS_UNPROCESSABLE_ENTITY && fetchArtGroups) {
      fetchArtGroups();
      doDismiss();
    }
  };

  const handleSaveClick = () => {
    if (saveForm) {
      saveForm('/art-grupa', formData, saveCallback);
    }
  };

  return (
    <>
      <ModalHeader title="Title" onDismiss={onDismiss} />
      <ModalBody>
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
      </ModalBody>
      <FormSaveCancelFooter
        fetching={fetching}
        textSave="xSave"
        textCancel="xCancel"
        onSave={handleSaveClick}
        onCancel={onDismiss}
      />
    </>
  );
};
