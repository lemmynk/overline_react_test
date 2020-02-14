// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ModalHeader,
  ModalBody,
  FormSaveCancelFooter,
} from '@newtash/core/Modal';
import { TextInput } from '@newtash/core/Input';
import FormErrorsBox from '@newtash/core/FormErrorsBox';
import { useForm } from '@newtash/core/hooks';
import {
  RESPONSE_STATUS_UNPROCESSABLE_ENTITY,
  ART_GROUPS_CRUD_URL,
} from '../../config';

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

  const [t] = useTranslation('forms');

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
      saveForm(ART_GROUPS_CRUD_URL, formData, saveCallback);
    }
  };

  return (
    <>
      <ModalHeader title={t('artGroups.title')} onDismiss={onDismiss} />
      <ModalBody>
        <FormErrorsBox
          errors={validationErrors}
          onClear={clearValidationErrors}
        />
        <TextInput
          label={t('artGroups.fields.grpSifra')}
          value={getPropValue('grpSifra')}
          onChange={setPropValue('grpSifra')}
          hasErrors={getPropHasErrors('grpSifra')}
        />
        <TextInput
          label={t('artGroups.fields.grpNaziv')}
          value={getPropValue('grpNaziv')}
          onChange={setPropValue('grpNaziv')}
          hasErrors={getPropHasErrors('grpNaziv')}
        />
      </ModalBody>
      <FormSaveCancelFooter
        fetching={fetching}
        textSave={t('Save')}
        textCancel={t('Cancel')}
        onSave={handleSaveClick}
        onCancel={onDismiss}
      />
    </>
  );
};
