// @flow
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Page,
  PageHeader,
  PageContent,
  FetchWrapper,
  Button,
  Select,
  Input,
  FormValidator,
} from '@newtash/react-app-core';

type Props = {
  title: string,
  fetching: string,
  grpSelectOptions: Object,
  pdvSelectOptions: Array<KeyTextObject>,
  initialState: ArtMainFormDataProps,
  saveData: ArtMainFormDataProps => void,
  onCancel: () => void,
};

const HeaderButton = styled(Button)`
  margin-left: ${({ theme }) => theme.size.gutter};
`;

const rules = {
  vArtikl: 'required|string',
  grpId: 'required|number',
  intSifra: 'required|string|max:20',
  artNaziv: 'required|string|max:120',
  mera: 'required|string|max:20',
  pdvId: 'required|number',
};

const Form = (props: Props) => {
  const { t } = useTranslation(['art', 'common']);
  const { coreT } = useTranslation('core');
  const {
    title,
    fetching,
    initialState,
    grpSelectOptions,
    pdvSelectOptions,
    saveData,
    onCancel,
  } = props;

  const [id, setId] = useState(0);
  const [vArtikl, setVArtikl] = useState('');
  const [grpId, setGrpId] = useState(0);
  const [intSifra, setIntSifra] = useState('');
  const [artNaziv, setArtNaziv] = useState('');
  const [mera, setMera] = useState('');
  const [pdvId, setPdvId] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});

  const formData = { id, vArtikl, grpId, intSifra, artNaziv, mera, pdvId };

  useEffect(() => {
    if (Object.keys(initialState).length > 0) {
      setId(initialState.id);
      setVArtikl(initialState.vArtikl);
      setGrpId(initialState.grpId);
      setIntSifra(initialState.intSifra);
      setArtNaziv(initialState.artNaziv);
      setMera(initialState.mera);
      setPdvId(initialState.pdvId);
      setValidationErrors({});
    }
  }, [initialState]);

  const handleSaveButtonClick = () => {
    const v = FormValidator.withRules(rules).withTranslation(coreT);
    if (v.validate(formData, setValidationErrors) && saveData) {
      saveData(formData);
    }
  };

  const renderHeaderButtons = useCallback(() => (
    <>
      <HeaderButton
        primary
        text={t('common:Save')}
        onClick={handleSaveButtonClick}
      />
      <HeaderButton text={t('common:Cancel')} onClick={onCancel} />
    </>
  ));

  const handlePropChange = (cb: any => void, isNumber: boolean = false) => (
    newValue: string,
  ) => {
    setValidationErrors({});
    cb(isNumber ? parseInt(newValue, 10) : newValue);
  };

  const handleGrpIdChange = (newValue: string) => {
    const newGrpId = parseInt(newValue, 10);
    if (newGrpId !== grpId) {
      // eslint-disable-next-line no-console
      console.log('grpId changed, update intSifra value', grpId, newGrpId);
      setGrpId(newGrpId);
    }
  };

  const hasError = (propName: string) =>
    Object.keys(validationErrors).includes(propName);

  return (
    <Page>
      <PageHeader title={t(title)} renderButtons={renderHeaderButtons} />
      <PageContent>
        <FetchWrapper fetching={fetching}>
          <Select
            label={t('artForm.grpId')}
            placeholder={t('artForm.grpPlaceholder')}
            options={grpSelectOptions[vArtikl]}
            value={grpId}
            onChange={handleGrpIdChange}
            hasError={hasError('grpId')}
            errorMessage={validationErrors.grpId}
          />
          <Input
            label={t('artForm.intSifra')}
            value={intSifra}
            onChange={handlePropChange(setIntSifra)}
            maxLength={20}
            hasError={hasError('intSifra')}
            errorMessage={validationErrors.intSifra}
          />
          <Input
            label={t('artForm.artNaziv')}
            value={artNaziv}
            onChange={handlePropChange(setArtNaziv)}
            maxLength={120}
            hasError={hasError('artNaziv')}
            errorMessage={validationErrors.artNaziv}
          />
          <Input
            label={t('artForm.mera')}
            value={mera}
            onChange={handlePropChange(setMera)}
            maxLength={20}
            hasError={hasError('mera')}
            errorMessage={validationErrors.mera}
          />
          <Select
            label={t('artForm.pdvId')}
            placeholder={t('artForm.pdvPlaceholder')}
            options={pdvSelectOptions}
            value={pdvId}
            onChange={handlePropChange(setPdvId, true)}
            hasError={hasError('pdvId')}
            errorMessage={validationErrors.pdvId}
          />
        </FetchWrapper>
      </PageContent>
    </Page>
  );
};

export default Form;
