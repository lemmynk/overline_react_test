// @flow
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormSaveCancelFooter,
} from '@newtash/core/Modal';
import { TextInput } from '@newtash/core/Input';
import FormErrorsBox from '@newtash/core/FormErrorsBox';
import useForm from '../useForm';
import { ART_GROUPS_CRUD_URL } from '../../config';
// import useForm from '../../utils/useForm';

type Props = {
  isOpen: boolean,
  itemId: number,
  vArtikl: string,
  onDismiss: () => void,
};

export default (props: Props) => {
  const { isOpen, itemId, vArtikl, onDismiss } = props;

  const codeEl = useRef(null);
  const nameEl = useRef(null);

  const [isFetched, setFetched] = useState(false);

  const [t] = useTranslation(['pages', 'common']);

  const fields = ['id', 'vArtikl', 'grpSifra', 'grpNaziv'];

  const {
    formData,
    validationErrors,
    getPropValue,
    setPropValue,
    getPropHasErrors,
    setFormData,
    fetchFormData,
    saveFormData,
  } = useForm({ url: ART_GROUPS_CRUD_URL, fields, t, tDomain: 'artGroups' });

  const setFocus = (ref: any) => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  useEffect(() => {
    if (!isFetched && isOpen) {
      setFetched(true);
      setFormData({ vArtikl });
      if (itemId > 0) {
        fetchFormData(itemId);
      }
      setFocus(codeEl);
    } else if (!isOpen) {
      setFetched(false);
    }
  }, [isFetched, isOpen, itemId, vArtikl, fetchFormData, setFormData]);

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
    saveFormData().then(success => console.log('success:', success));
  };

  return (
    <Modal isOpen={isOpen} onDismiss={doDismiss}>
      <ModalHeader title={t('artGroups.formTitle')} onDismiss={doDismiss} />
      <ModalBody>
        <FormErrorsBox
          errors={validationErrors}
          onClear={handleClearValidationErrors}
        />
        <TextInput
          ref={codeEl}
          label={t('artGroups.fields.grpSifra')}
          value={getPropValue('grpSifra')}
          onChange={setPropValue('grpSifra')}
          hasErrors={getPropHasErrors('grpSifra')}
        />
        <TextInput
          ref={nameEl}
          label={t('artGroups.fields.grpNaziv')}
          value={getPropValue('grpNaziv')}
          onChange={setPropValue('grpNaziv')}
          hasErrors={getPropHasErrors('grpNaziv')}
        />
        <pre>{JSON.stringify({ formData }, null, 2)}</pre>
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
