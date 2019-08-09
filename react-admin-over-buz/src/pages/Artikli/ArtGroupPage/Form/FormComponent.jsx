// @flow
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, FormValidator } from '@newtash/react-app-core';
import { FormSaveCancelRow } from '../../../../components';

type Props = {
  data: ArtGroupFormDataProps,
  onSave: ArtGroupFormDataProps => void,
  onCancel: () => void,
};

const rules = {
  naziv: 'required|string|max:120',
  sifra: 'required|string|max:20',
};

const FormComponent = (props: Props) => {
  const { data, onSave, onCancel } = props;

  const [t] = useTranslation('art');
  const [coreT] = useTranslation('core');

  const [naziv, setNaziv] = useState('');
  const [sifra, setSifra] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const { grpNaziv, grpSifra } = data;
    setNaziv(grpNaziv);
    setSifra(grpSifra);
    setValidationErrors({});
  }, [data]);

  const handlePropChange = (cb: string => void) => (newValue: string) => {
    setValidationErrors({});
    cb(newValue);
  };

  const handleSaveButtonClick = () => {
    const v = FormValidator.withRules(rules).withTranslation(coreT);

    if (v.validate({ naziv, sifra }, setValidationErrors) && onSave) {
      onSave({ ...data, grpNaziv: naziv, grpSifra: sifra });
    }
  };

  const handleCancelButtonClick = useCallback(() => {
    setValidationErrors({});
    onCancel();
  }, []);

  const hasError = (propName: string) =>
    Object.keys(validationErrors).includes(propName);

  return (
    <>
      <Input
        label={t('grpNaziv')}
        value={naziv}
        onChange={handlePropChange(setNaziv)}
        hasError={hasError('naziv')}
        errorMessage={validationErrors.naziv}
      />
      <Input
        label={t('grpSifra')}
        value={sifra}
        onChange={handlePropChange(setSifra)}
        hasError={hasError('sifra')}
        errorMessage={validationErrors.sifra}
      />
      <FormSaveCancelRow
        onSave={handleSaveButtonClick}
        onCancel={handleCancelButtonClick}
      />
    </>
  );
};

export default FormComponent;
