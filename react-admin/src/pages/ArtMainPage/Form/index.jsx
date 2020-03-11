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
import { ART_MAIN_CRUD_URL } from '../../../config';
import { useForm } from '../../../utils';
import { useArtGroups, useArtPdv } from '../../../state';

const fields = [
  'id',
  'vArtikl',
  'grpId',
  'intSifra',
  'artNaziv',
  'mera',
  'pdvId',
];

export default () => {
  const { t } = useTranslation(['pages', 'common']);
  const history = useHistory();
  const { action, id } = useParams();
  const { selectOptions } = useArtGroups();
  const { selectOptions: pdvOptions } = useArtPdv();

  const {
    location: { pathname, search },
  } = history;
  const baseUrl = pathname
    .substr(1)
    .split('/')
    .shift();

  const hook = useForm({
    url: ART_MAIN_CRUD_URL,
    fields,
    t,
    tDomain: 'artMain',
    focusField: 'grpId',
  });
  const {
    refs,
    moveFocusTo,
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
  const vArtikl = getPropValue('vArtikl', 'roba');
  const grpOptions = selectOptions(vArtikl);
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
    const s = search || `?vArtikl=${vArtikl}`;
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
        title={t(isCreate ? 'artMain.formTitleAdd' : 'artMain.formTitleEdit')}
        description={t('artMain.formDescription')}
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
          <Select
            ref={refs.grpId}
            label={t('artMain.fields.grpId')}
            placeholder={t('artMain.placeholder.grpId')}
            options={grpOptions}
            value={getPropValue('grpId', '')}
            onChange={setPropValue('grpId')}
            hasErrors={getPropHasErrors('grpId')}
          />
          <TextInput
            ref={refs.intSifra}
            label={t('artMain.fields.intSifra')}
            value={getPropValue('intSifra')}
            onChange={setPropValue('intSifra')}
            hasErrors={getPropHasErrors('intSifra')}
            onEnterPress={() => moveFocusTo('artNaziv')}
          />
          <TextInput
            ref={refs.artNaziv}
            label={t('artMain.fields.artNaziv')}
            value={getPropValue('artNaziv')}
            onChange={setPropValue('artNaziv')}
            hasErrors={getPropHasErrors('artNaziv')}
            onEnterPress={() => moveFocusTo('mera')}
          />
          <TextInput
            ref={refs.mera}
            label={t('artMain.fields.mera')}
            value={getPropValue('mera')}
            onChange={setPropValue('mera')}
            hasErrors={getPropHasErrors('mera')}
            onEnterPress={() => moveFocusTo('pdvId')}
          />
          <Select
            ref={refs.pdvId}
            label={t('artMain.fields.pdvId')}
            placeholder={t('artMain.placeholder.pdvId')}
            options={pdvOptions()}
            value={getPropValue('pdvId', '')}
            onChange={setPropValue('pdvId')}
            hasErrors={getPropHasErrors('pdvId')}
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
            textConfirmBody={t('artMain.deleteConfirmation')}
            textConfirm={t('common:Yes')}
            textDismiss={t('common:No')}
            onDelete={handleDeleteAction}
            onSave={handleSaveAction}
            onCancel={goBack}
          />
        </Card>
      </PageContent>
    </Page>
  );
};
