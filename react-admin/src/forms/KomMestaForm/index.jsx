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
import { KOM_MESTA_CRUD_URL } from '../../config';

type Props = {
  isOpen: boolean,
  itemId: number,
  onDismiss: () => void,
  onSuccess: () => void,
};

const fields = ['id', 'zip', 'naziv', 'opstina'];

export default (props: Props) => {
  const { isOpen, itemId, onDismiss, onSuccess } = props;

  const zipEl = useRef(null);
  const nazivEl = useRef(null);
  const opstinaEl = useRef(null);

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
  } = useForm({ url: KOM_MESTA_CRUD_URL, fields, t, tDomain: 'komMesta' });

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
      doFetchUrl(`/${itemId > 0 ? itemId : 'init'}`);
      setFocus(zipEl);
    } else {
      clearFormData();
    }
  }, [isOpen, clearFormData, doFetchUrl, itemId, setFocus]);

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
      <ModalHeader title={t('komMesta.formTitle')} onDismiss={doDismiss} />
      <ModalBody>
        <FormErrorsBox
          errors={validationErrors}
          onClear={clearValidationErrors}
        />
        <TextInput
          ref={zipEl}
          label={t('komMesta.fields.zip')}
          value={getPropValue('zip')}
          onChange={setPropValue('zip')}
          hasErrors={getPropHasErrors('zip')}
        />
        <TextInput
          ref={nazivEl}
          label={t('komMesta.fields.naziv')}
          value={getPropValue('naziv')}
          onChange={setPropValue('naziv')}
          hasErrors={getPropHasErrors('naziv')}
        />
        <TextInput
          ref={opstinaEl}
          label={t('komMesta.fields.opstina')}
          value={getPropValue('opstina')}
          onChange={setPropValue('opstina')}
          hasErrors={getPropHasErrors('opstina')}
        />
        <pre>{JSON.stringify(formData, null, 2)}</pre>
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
