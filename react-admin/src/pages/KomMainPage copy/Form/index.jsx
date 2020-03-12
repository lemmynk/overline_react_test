/* eslint-disable no-bitwise */
// @flow
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import qs from 'qs';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import FormErrorsBox from '@newtash/core/FormErrorsBox';
import Button from '@newtash/core/Button';
import Select from '@newtash/core/Select';
import { TextInput, NumberInput, TextArea } from '@newtash/core/Input';
import Checkbox from '@newtash/core/Checkbox';
import { CrudActionsRow } from '../../../components';
import { KOM_MAIN_CRUD_URL } from '../../../config';
import { useForm } from '../../../utils';
import { useKomMesta } from '../../../state';
import styles from './KomMainForm.module.scss';

const fields = [
  'id',
  'vKom',
  'sifra',
  'intNaziv',
  'naziv',
  'mestoId',
  'adresa',
  'telefon',
  'fax',
  'vlasnik',
  'kontakt',
  'mobilni',
  'web',
  'email',
  'pdvObveznik',
  'pib',
  'pdvBroj',
  'maticniBroj',
  'sifraDelatnosti',
  'napomena',
  'isSuspended',
  'prodValuta',
  'prodRabat',
  'prodLimit',
  'nabDpo',
];

export default () => {
  const { t } = useTranslation(['komPages', 'common']);
  const history = useHistory();
  const { action, id } = useParams();
  const { selectOptions } = useKomMesta();

  const {
    location: { pathname, search },
  } = history;
  const baseUrl = pathname
    .substr(1)
    .split('/')
    .shift();

  const hook = useForm({
    url: KOM_MAIN_CRUD_URL,
    fields,
    t,
    tDomain: 'komMain',
  });
  const {
    formData,
    validationErrors,
    hasProp,
    getPropValue,
    setPropValue,
    setPropValueAction,
    getPropHasErrors,
    isFetching,
    isSaving,
    isSaved,
    clearValidationErrors,
    doFetchUrl,
    saveFormData,
    deleteFormData,
  } = hook;
  const vKom = parseInt(getPropValue('vKom', 1), 10);
  const isCreate = action === 'create';
  const isFirma = (vKom & 1) === 1;
  const isKupac = (vKom & 2) === 2;
  const isDobavljac = (vKom & 4) === 4;

  /**
   * Filter query string to include only "fields"
   */
  useEffect(() => {
    const q = qs.parse(search, { ignoreQueryPrefix: true });
    const fq = Object.keys(q)
      .filter(key => fields.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: q[key] }), {});
    const fetchUrl = isCreate ? `/init?${qs.stringify(fq)}` : `/${id}`;
    doFetchUrl(fetchUrl);
  }, [isCreate, search, id, doFetchUrl]);

  /**
   * Go back to previous screen
   */
  const goBack = () => {
    const s = search || `?vKom=${vKom}`;
    history.push(['/', baseUrl, s].join(''));
  };

  /**
   * Make a call to save form data and act on success/failure
   */
  const handleSaveAction = () => {
    saveFormData();
    // .then(success => {
    //   if (success) {
    //     goBack();
    //   }
    // });
  };

  /**
   * Make a call to delete form data and act on success/failure
   */
  const handleDeleteAction = () => {
    deleteFormData().then(success => {
      if (success) {
        goBack();
      }
    });
  };

  const handleIsKupacChange = (checked: boolean) => {
    const newValue = checked ? vKom | 2 : vKom ^ 2;
    setPropValueAction('vKom', newValue);
  };

  const handleIsDobavljacChange = (checked: boolean) => {
    const newValue = checked ? vKom | 4 : vKom ^ 4;
    setPropValueAction('vKom', newValue);
  };

  return (
    <Page>
      <PageHeader
        title={t(isCreate ? 'komMain.formTitleAdd' : 'komMain.formTitleEdit')}
        description={t('komMain.formDescription')}
        renderButtons={() => (
          <Button primary compact text={t('common:Back')} onClick={goBack} />
        )}
      />
      <PageContent>
        <FormErrorsBox
          errors={validationErrors}
          onClear={clearValidationErrors}
        />
        <div className={styles.grid}>
          <Card compact>
            <TextInput
              label={t('komMain.fields.sifra')}
              value={getPropValue('sifra')}
              onChange={setPropValue('sifra')}
              hasErrors={getPropHasErrors('sifra')}
            />
            <TextInput
              label={t('komMain.fields.intNaziv')}
              value={getPropValue('intNaziv')}
              onChange={setPropValue('intNaziv')}
              hasErrors={getPropHasErrors('intNaziv')}
            />
            <TextInput
              label={t('komMain.fields.naziv')}
              value={getPropValue('naziv')}
              onChange={setPropValue('naziv')}
              hasErrors={getPropHasErrors('naziv')}
            />
            <Checkbox
              label={t('komMain.fields.pdvObveznik')}
              isChecked={!!getPropValue('pdvObveznik')}
              onChange={setPropValue('pdvObveznik')}
              hasErrors={getPropHasErrors('pdvObveznik')}
            />
            <TextInput
              label={t('komMain.fields.pib')}
              value={getPropValue('pib')}
              onChange={setPropValue('pib')}
              hasErrors={getPropHasErrors('pib')}
            />
            <TextInput
              label={t('komMain.fields.pdvBroj')}
              value={getPropValue('pdvBroj')}
              onChange={setPropValue('pdvBroj')}
              hasErrors={getPropHasErrors('pdvBroj')}
            />
            <TextInput
              label={t('komMain.fields.maticniBroj')}
              value={getPropValue('maticniBroj')}
              onChange={setPropValue('maticniBroj')}
              hasErrors={getPropHasErrors('maticniBroj')}
            />
            <TextInput
              label={t('komMain.fields.sifraDelatnosti')}
              value={getPropValue('sifraDelatnosti')}
              onChange={setPropValue('sifraDelatnosti')}
              hasErrors={getPropHasErrors('sifraDelatnosti')}
            />
          </Card>
          <Card compact>
            <Select
              label={t('komMain.fields.mestoId')}
              placeholder={t('komMain.placeholder.mestoId')}
              options={selectOptions}
              value={getPropValue('mestoId', '')}
              onChange={setPropValue('mestoId')}
              hasErrors={getPropHasErrors('mestoId')}
            />
            <TextInput
              label={t('komMain.fields.adresa')}
              value={getPropValue('adresa')}
              onChange={setPropValue('adresa')}
              hasErrors={getPropHasErrors('adresa')}
            />
            <TextInput
              label={t('komMain.fields.telefon')}
              value={getPropValue('telefon')}
              onChange={setPropValue('telefon')}
              hasErrors={getPropHasErrors('telefon')}
            />
            <TextInput
              label={t('komMain.fields.fax')}
              value={getPropValue('fax')}
              onChange={setPropValue('fax')}
              hasErrors={getPropHasErrors('fax')}
            />
            <TextInput
              label={t('komMain.fields.vlasnik')}
              value={getPropValue('vlasnik')}
              onChange={setPropValue('vlasnik')}
              hasErrors={getPropHasErrors('vlasnik')}
            />
            <TextInput
              label={t('komMain.fields.kontakt')}
              value={getPropValue('kontakt')}
              onChange={setPropValue('kontakt')}
              hasErrors={getPropHasErrors('kontakt')}
            />
            <TextInput
              label={t('komMain.fields.mobilni')}
              value={getPropValue('mobilni')}
              onChange={setPropValue('mobilni')}
              hasErrors={getPropHasErrors('mobilni')}
            />
            <TextInput
              label={t('komMain.fields.web')}
              value={getPropValue('web')}
              onChange={setPropValue('web')}
              hasErrors={getPropHasErrors('web')}
            />
            <TextInput
              label={t('komMain.fields.email')}
              value={getPropValue('email')}
              onChange={setPropValue('email')}
              hasErrors={getPropHasErrors('email')}
            />
          </Card>
          <Card compact>
            <Checkbox
              label={t('common:vKom.2')}
              isChecked={isKupac}
              onChange={handleIsKupacChange}
              hasErrors={getPropHasErrors('vKom')}
            />
            <Checkbox
              label={t('common:vKom.4')}
              isChecked={isDobavljac}
              onChange={handleIsDobavljacChange}
              hasErrors={getPropHasErrors('vKom')}
            />
            <Checkbox
              label={t('komMain.fields.isSuspended')}
              isChecked={!!getPropValue('isSuspended')}
              onChange={setPropValue('isSuspended')}
              hasErrors={getPropHasErrors('isSuspended')}
            />
            <NumberInput
              label={t('komMain.fields.prodValuta')}
              value={getPropValue('prodValuta')}
              onChange={setPropValue('prodValuta')}
              hasErrors={getPropHasErrors('prodValuta')}
            />
            <NumberInput
              label={t('komMain.fields.prodRabat')}
              value={getPropValue('prodRabat')}
              onChange={setPropValue('prodRabat')}
              hasErrors={getPropHasErrors('prodRabat')}
            />
            <NumberInput
              label={t('komMain.fields.prodLimit')}
              value={getPropValue('prodLimit')}
              onChange={setPropValue('prodLimit')}
              hasErrors={getPropHasErrors('prodLimit')}
            />
            <NumberInput
              label={t('komMain.fields.nabDpo')}
              value={getPropValue('nabDpo')}
              onChange={setPropValue('nabDpo')}
              hasErrors={getPropHasErrors('nabDpo')}
            />
          </Card>
          <Card compact>
            <TextArea
              compact
              rows={8}
              placeholder={t('komMain.placeholder.napomena')}
              label={t('komMain.fields.napomena')}
              value={getPropValue('napomena')}
              onChange={setPropValue('napomena')}
              hasErrors={getPropHasErrors('napomena')}
            />
          </Card>
        </div>
        <Card>
          <CrudActionsRow
            compact
            borderless
            fetching={isSaving}
            isSaved={isSaved}
            withDelete={hasProp('id')}
            textDelete={t('common:Delete')}
            textSave={t('common:Save')}
            textCancel={t('common:Cancel')}
            titleConfirm={t('common:areYouSure')}
            textConfirmBody={t('komMain.deleteConfirmation')}
            textConfirm={t('common:Yes')}
            textDismiss={t('common:No')}
            onDelete={handleDeleteAction}
            onSave={handleSaveAction}
            onCancel={goBack}
          />
        </Card>
        <Card>
          <pre>
            {JSON.stringify(
              { isFetching, isFirma, isKupac, isDobavljac, formData },
              null,
              2,
            )}
          </pre>
        </Card>
      </PageContent>
    </Page>
  );
};
