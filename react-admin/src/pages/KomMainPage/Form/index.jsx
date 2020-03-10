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
import { TextInput } from '@newtash/core/Input';
import { CrudActionsRow } from '../../../components';
import { KOM_MAIN_CRUD_URL } from '../../../config';
import { useForm } from '../../../utils';
import { useKomMesta } from '../../../state';

const fields = ['id', 'vKom', 'sifra', 'intNaziv', 'naziv', 'mestoId'];

export default () => {
  const { t } = useTranslation(['pages', 'common']);
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
    tDomain: 'artMain',
  });
  const {
    formData,
    validationErrors,
    hasProp,
    getPropValue,
    setPropValue,
    getPropHasErrors,
    isSaving,
    isSaved,
    clearValidationErrors,
    doFetchUrl,
    saveFormData,
    deleteFormData,
  } = hook;
  const vKom = getPropValue('vKom', 1);
  const isCreate = action === 'create';

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
        <Card>
          <FormErrorsBox
            errors={validationErrors}
            onClear={clearValidationErrors}
          />
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
          <Select
            label={t('komMain.fields.mestoId')}
            placeholder={t('komMain.placeholder.mestoId')}
            options={selectOptions}
            value={getPropValue('mestoId', '')}
            onChange={setPropValue('mestoId')}
            hasErrors={getPropHasErrors('mestoId')}
          />
          <CrudActionsRow
            compact
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
          <pre>{JSON.stringify({ formData }, null, 2)}</pre>
        </Card>
      </PageContent>
    </Page>
  );
};
