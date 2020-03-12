// @flow
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import FormErrorsBox from '@newtash/core/FormErrorsBox';
import Button from '@newtash/core/Button';
import { TextInput } from '@newtash/core/Input';
import Select from '@newtash/core/Select';
import { CrudActionsRow, FetchWrapper } from '../../components';
import { useForm } from '../../utils';
import {
  ART_MAIN_CRUD_URL,
  RESPONSE_STATUS_UNPROCESSABLE_ENTITY,
} from '../../config';

type Props = {
  formFetching: boolean,
  dataFetching: string,
  initialData: Data,
  formErrors: Object,
  grpOptions: Array<KeyTextObject>,
  pdvOptions: Array<KeyTextObject>,
  fetchFormData: Object => void,
  clearFormErrors: () => void,
  saveForm: (Object, SaveCallback) => void,
  deleteForm: (Object, DeleteCallback) => void,
};

const Form = (props: Props) => {
  const {
    formFetching,
    dataFetching,
    initialData,
    formErrors,
    grpOptions,
    pdvOptions,
    fetchFormData,
    clearFormErrors,
    saveForm,
    deleteForm,
  } = props;

  const { t } = useTranslation(['pages', 'common']);
  const history = useHistory();
  const { action, id } = useParams();
  const isCreate = action === 'create';

  const formParams = { t, tDomain: 'artMain' };
  const form = useForm(initialData, formErrors, formParams);
  const {
    formData,
    errors,
    isSaved,
    getHasProp,
    getPropValue,
    setPropValue,
    getPropHasErrors,
    setSaved,
  } = form;

  useEffect(() => {
    if (id && fetchFormData) {
      fetchFormData({
        url: [ART_MAIN_CRUD_URL, id].join('/'),
      });
    }
  }, [id, fetchFormData]);

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const saveCallback = (response: AxiosResponseProps) => {
    const { status } = response;
    if (status !== RESPONSE_STATUS_UNPROCESSABLE_ENTITY) {
      setSaved();
    }
  };

  const handleSaveAction = () => {
    const payload = {
      url: ART_MAIN_CRUD_URL,
      data: formData,
    };
    if (saveForm) {
      saveForm(payload, saveCallback);
    }
  };

  const deleteCallback = (response: AxiosResponseProps) => {
    // console.log('delete response:', response);
    const { status } = response;
    if (status !== RESPONSE_STATUS_UNPROCESSABLE_ENTITY) {
      handleBackButtonClick();
    }
  };

  const handleDeleteAction = () => {
    const payload = {
      url: ART_MAIN_CRUD_URL,
      id: formData.id,
      errorMsg: t('artMain.errors.delete-error'),
    };
    if (deleteForm) {
      deleteForm(payload, deleteCallback);
    }
  };

  return (
    <Page>
      <PageHeader
        title={t(isCreate ? 'artMain.formTitleAdd' : 'artMain.formTitleEdit')}
        description={t('artMain.formDescription')}
        renderButtons={() => (
          <Button
            primary
            compact
            text={t('common:Back')}
            onClick={handleBackButtonClick}
          />
        )}
      />
      <PageContent>
        <Card>
          <FetchWrapper fetching={dataFetching}>
            <FormErrorsBox errors={errors} onClear={clearFormErrors} />
            <Select
              label={t('artMain.fields.grpId')}
              placeholder={t('artMain.placeholder.grpId')}
              options={grpOptions}
              value={getPropValue('grpId', '')}
              onChange={setPropValue('grpId')}
              hasErrors={getPropHasErrors('grpId')}
            />
            <TextInput
              label={t('artMain.fields.intSifra')}
              value={getPropValue('intSifra')}
              onChange={setPropValue('intSifra')}
              hasErrors={getPropHasErrors('intSifra')}
            />
            <TextInput
              label={t('artMain.fields.artNaziv')}
              value={getPropValue('artNaziv')}
              onChange={setPropValue('artNaziv')}
              hasErrors={getPropHasErrors('artNaziv')}
            />
            <TextInput
              label={t('artMain.fields.mera')}
              value={getPropValue('mera')}
              onChange={setPropValue('mera')}
              hasErrors={getPropHasErrors('mera')}
            />
            <Select
              label={t('artMain.fields.pdvId')}
              placeholder={t('artMain.placeholder.pdvId')}
              options={pdvOptions}
              value={getPropValue('pdvId', '')}
              onChange={setPropValue('pdvId')}
              hasErrors={getPropHasErrors('pdvId')}
            />
            <CrudActionsRow
              compact
              fetching={formFetching}
              isSaved={isSaved}
              withDelete={getHasProp('id')}
              textDelete={t('common:Delete')}
              textSave={t('common:Save')}
              textCancel={t('common:Cancel')}
              titleConfirm={t('common:areYouSure')}
              textConfirmBody={t('artMain.deleteConfirmation')}
              textConfirm={t('common:Yes')}
              textDismiss={t('common:No')}
              onDelete={handleDeleteAction}
              onSave={handleSaveAction}
              onCancel={handleBackButtonClick}
            />
          </FetchWrapper>
        </Card>
      </PageContent>
    </Page>
  );
};

export default Form;
