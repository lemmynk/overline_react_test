// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormSaveCancelFooter,
} from '@newtash/core/Modal';
import { TextInput } from '@newtash/core/Input';
import FormErrorsBox from '@newtash/core/FormErrorsBox';
import useForm from '../../utils/useForm';

type Props = {
  isOpen: boolean,
  onDismiss: () => void,
};

export default (props: Props) => {
  const { isOpen, onDismiss } = props;

  const [t] = useTranslation(['pages', 'common']);

  const {
    // formData,
    errors,
    getPropValue,
    setPropValue,
    getPropHasErrors,
  } = useForm({}, {}, { t, tDomain: 'artGroups' });
  // } = useForm(data, validationErrors, { t, tDomain: 'artGroups' });

  const doDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleClearValidationErrors = () => {
    console.log('handleClearValidationErrors');
  };

  const handleSaveClick = () => {
    console.log('handleSaveClick');
  };

  return (
    <Modal isOpen={isOpen} onDismiss={doDismiss}>
      <ModalHeader title={t('artGroups.formTitle')} onDismiss={doDismiss} />
      <ModalBody>
        <FormErrorsBox errors={errors} onClear={handleClearValidationErrors} />
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
        // fetching={fetching}
        textSave={t('common:Save')}
        textCancel={t('common:Cancel')}
        onSave={handleSaveClick}
        onCancel={doDismiss}
      />
    </Modal>
  );
};
