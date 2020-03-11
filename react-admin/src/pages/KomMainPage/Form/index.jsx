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
    focusField: 'sifra',
  });
  const {
    refs,
    moveFocusTo,
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
              ref={refs.sifra}
              label={t('komMain.fields.sifra')}
              value={getPropValue('sifra')}
              onChange={setPropValue('sifra')}
              hasErrors={getPropHasErrors('sifra')}
              onEnterPress={() => moveFocusTo('intNaziv')}
            />
            <TextInput
              ref={refs.intNaziv}
              label={t('komMain.fields.intNaziv')}
              value={getPropValue('intNaziv')}
              onChange={setPropValue('intNaziv')}
              hasErrors={getPropHasErrors('intNaziv')}
              onEnterPress={() => moveFocusTo('naziv', 'intNaziv')}
            />
            <TextInput
              ref={refs.naziv}
              label={t('komMain.fields.naziv')}
              value={getPropValue('naziv')}
              onChange={setPropValue('naziv')}
              hasErrors={getPropHasErrors('naziv')}
              onEnterPress={() => moveFocusTo('pib')}
            />
            <Checkbox
              label={t('komMain.fields.pdvObveznik')}
              isChecked={!!getPropValue('pdvObveznik')}
              onChange={setPropValue('pdvObveznik')}
              hasErrors={getPropHasErrors('pdvObveznik')}
            />
            <TextInput
              ref={refs.pib}
              label={t('komMain.fields.pib')}
              value={getPropValue('pib')}
              onChange={setPropValue('pib')}
              hasErrors={getPropHasErrors('pib')}
              onEnterPress={() => moveFocusTo('pdvBroj')}
            />
            <TextInput
              ref={refs.pdvBroj}
              label={t('komMain.fields.pdvBroj')}
              value={getPropValue('pdvBroj')}
              onChange={setPropValue('pdvBroj')}
              hasErrors={getPropHasErrors('pdvBroj')}
              onEnterPress={() => moveFocusTo('maticniBroj')}
            />
            <TextInput
              ref={refs.maticniBroj}
              label={t('komMain.fields.maticniBroj')}
              value={getPropValue('maticniBroj')}
              onChange={setPropValue('maticniBroj')}
              hasErrors={getPropHasErrors('maticniBroj')}
              onEnterPress={() => moveFocusTo('sifraDelatnosti')}
            />
            <TextInput
              ref={refs.sifraDelatnosti}
              label={t('komMain.fields.sifraDelatnosti')}
              value={getPropValue('sifraDelatnosti')}
              onChange={setPropValue('sifraDelatnosti')}
              hasErrors={getPropHasErrors('sifraDelatnosti')}
              onEnterPress={() => moveFocusTo('mestoId')}
            />
          </Card>
          <Card compact>
            <Select
              ref={refs.mestoId}
              label={t('komMain.fields.mestoId')}
              placeholder={t('komMain.placeholder.mestoId')}
              options={selectOptions}
              value={getPropValue('mestoId', '')}
              onChange={setPropValue('mestoId')}
              hasErrors={getPropHasErrors('mestoId')}
            />
            <TextInput
              ref={refs.adresa}
              label={t('komMain.fields.adresa')}
              value={getPropValue('adresa')}
              onChange={setPropValue('adresa')}
              hasErrors={getPropHasErrors('adresa')}
              onEnterPress={() => moveFocusTo('telefon')}
            />
            <TextInput
              ref={refs.telefon}
              label={t('komMain.fields.telefon')}
              value={getPropValue('telefon')}
              onChange={setPropValue('telefon')}
              hasErrors={getPropHasErrors('telefon')}
              onEnterPress={() => moveFocusTo('fax')}
            />
            <TextInput
              ref={refs.fax}
              label={t('komMain.fields.fax')}
              value={getPropValue('fax')}
              onChange={setPropValue('fax')}
              hasErrors={getPropHasErrors('fax')}
              onEnterPress={() => moveFocusTo('vlasnik')}
            />
            <TextInput
              ref={refs.vlasnik}
              label={t('komMain.fields.vlasnik')}
              value={getPropValue('vlasnik')}
              onChange={setPropValue('vlasnik')}
              hasErrors={getPropHasErrors('vlasnik')}
              onEnterPress={() => moveFocusTo('kontakt')}
            />
            <TextInput
              ref={refs.kontakt}
              label={t('komMain.fields.kontakt')}
              value={getPropValue('kontakt')}
              onChange={setPropValue('kontakt')}
              hasErrors={getPropHasErrors('kontakt')}
              onEnterPress={() => moveFocusTo('mobilni')}
            />
            <TextInput
              ref={refs.mobilni}
              label={t('komMain.fields.mobilni')}
              value={getPropValue('mobilni')}
              onChange={setPropValue('mobilni')}
              hasErrors={getPropHasErrors('mobilni')}
              onEnterPress={() => moveFocusTo('web')}
            />
            <TextInput
              ref={refs.web}
              label={t('komMain.fields.web')}
              value={getPropValue('web')}
              onChange={setPropValue('web')}
              hasErrors={getPropHasErrors('web')}
              onEnterPress={() => moveFocusTo('email')}
            />
            <TextInput
              ref={refs.email}
              label={t('komMain.fields.email')}
              value={getPropValue('email')}
              onChange={setPropValue('email')}
              hasErrors={getPropHasErrors('email')}
              onEnterPress={() => moveFocusTo('prodValuta')}
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
              ref={refs.prodValuta}
              label={t('komMain.fields.prodValuta')}
              value={getPropValue('prodValuta')}
              onChange={setPropValue('prodValuta')}
              hasErrors={getPropHasErrors('prodValuta')}
              onEnterPress={() => moveFocusTo('prodRabat')}
            />
            <NumberInput
              ref={refs.prodRabat}
              label={t('komMain.fields.prodRabat')}
              value={getPropValue('prodRabat')}
              onChange={setPropValue('prodRabat')}
              hasErrors={getPropHasErrors('prodRabat')}
              onEnterPress={() => moveFocusTo('prodLimit')}
            />
            <NumberInput
              ref={refs.prodLimit}
              label={t('komMain.fields.prodLimit')}
              value={getPropValue('prodLimit')}
              onChange={setPropValue('prodLimit')}
              hasErrors={getPropHasErrors('prodLimit')}
              onEnterPress={() => moveFocusTo('nabDpo')}
            />
            <NumberInput
              ref={refs.nabDpo}
              label={t('komMain.fields.nabDpo')}
              value={getPropValue('nabDpo')}
              onChange={setPropValue('nabDpo')}
              hasErrors={getPropHasErrors('nabDpo')}
              onEnterPress={() => moveFocusTo('napomena')}
            />
          </Card>
          <Card compact>
            <TextArea
              compact
              rows={8}
              ref={refs.napomena}
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
