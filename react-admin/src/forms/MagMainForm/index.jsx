// @flow
import React, { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormSaveCancelFooter,
} from '@newtash/core/Modal';
import { TextInput, TextArea } from '@newtash/core/Input';
import FormErrorsBox from '@newtash/core/FormErrorsBox';
import { useForm } from '../../utils';
import { MAG_MAIN_CRUD_URL } from '../../config';

type Props = {
  isOpen: boolean,
  itemId: number,
  vPromet: string,
  onDismiss: () => void,
  onSuccess: () => void,
};

const fields = [
  'id',
  'vPromet',
  'sifra',
  'magNaziv',
  'kepuNaziv',
  'kepuMesto',
  'opis',
];

export default (props: Props) => {
  const { isOpen, itemId, vPromet, onDismiss, onSuccess } = props;

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
  } = useForm({ url: MAG_MAIN_CRUD_URL, fields, t, tDomain: 'magMains' });

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
      doFetchUrl(`/${itemId > 0 ? itemId : 'init'}?vPromet=${vPromet}`);
      setFocus(codeEl);
    } else {
      clearFormData();
    }
  }, [isOpen, clearFormData, doFetchUrl, itemId, vPromet, setFocus]);

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
      <ModalHeader title={t('magMains.formTitle')} onDismiss={doDismiss} />
      <ModalBody>
        <FormErrorsBox
          errors={validationErrors}
          onClear={clearValidationErrors}
        />
        <TextInput
          ref={codeEl}
          label={t('magMains.fields.sifra')}
          value={getPropValue('sifra')}
          onChange={setPropValue('sifra')}
          hasErrors={getPropHasErrors('sifra')}
        />
        <TextInput
          ref={nameEl}
          label={t('magMains.fields.magNaziv')}
          value={getPropValue('magNaziv')}
          onChange={setPropValue('magNaziv')}
          hasErrors={getPropHasErrors('magNaziv')}
        />
        <TextInput
          label={t('magMains.fields.kepuNaziv')}
          value={getPropValue('kepuNaziv')}
          onChange={setPropValue('kepuNaziv')}
          hasErrors={getPropHasErrors('kepuNaziv')}
        />
        <TextInput
          label={t('magMains.fields.kepuMesto')}
          value={getPropValue('kepuMesto')}
          onChange={setPropValue('kepuMesto')}
          hasErrors={getPropHasErrors('kepuMesto')}
        />
        <TextArea
          rows={3}
          label={t('magMains.fields.opis')}
          value={getPropValue('opis')}
          onChange={setPropValue('opis')}
          hasErrors={getPropHasErrors('opis')}
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
