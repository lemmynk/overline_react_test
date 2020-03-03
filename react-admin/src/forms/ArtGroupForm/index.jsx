// @flow
import React, { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormSaveCancelFooter,
} from '@newtash/core/Modal';
import { TextInput } from '@newtash/core/Input';
import FormErrorsBox from '@newtash/core/FormErrorsBox';
import { useForm } from '../../utils';
import { ART_GROUPS_CRUD_URL } from '../../config';

type Props = {
  isOpen: boolean,
  itemId: number,
  vArtikl: string,
  onDismiss: () => void,
  onSuccess: () => void,
};

const fields = ['id', 'vArtikl', 'grpSifra', 'grpNaziv', 'artPattern'];

export default (props: Props) => {
  const { isOpen, itemId, vArtikl, onDismiss, onSuccess } = props;

  const codeEl = useRef(null);
  const nameEl = useRef(null);

  const [t] = useTranslation(['pages', 'common']);

  const {
    formData,
    validationErrors,
    getPropValue,
    setPropValue,
    getPropHasErrors,
    isSaving,
    clearFormData,
    clearValidationErrors,
    doFetchUrl,
    saveFormData,
  } = useForm({ url: ART_GROUPS_CRUD_URL, fields, t, tDomain: 'artGroups' });

  const setFocus = useCallback((ref: any) => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, []);

  /**
   * Form Mount/unMount events handler
   * - trigger data fetching and focus, or
   * - clear form data
   */
  useEffect(() => {
    if (isOpen) {
      doFetchUrl(`/${itemId > 0 ? itemId : 'init'}?vArtikl=${vArtikl}`);
      setFocus(codeEl);
    } else {
      clearFormData();
    }
  }, [isOpen, clearFormData, doFetchUrl, itemId, vArtikl, setFocus]);

  const doDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleSaveClick = () => {
    saveFormData().then(success => {
      if (success && onSuccess) {
        onSuccess();
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onDismiss={doDismiss}>
      <ModalHeader title={t('artGroups.formTitle')} onDismiss={doDismiss} />
      <ModalBody>
        <FormErrorsBox
          errors={validationErrors}
          onClear={clearValidationErrors}
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
        fetching={isSaving}
        textSave={t('common:Save')}
        textCancel={t('common:Cancel')}
        onSave={handleSaveClick}
        onCancel={doDismiss}
      />
    </Modal>
  );
};
