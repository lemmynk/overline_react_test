// @flow
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import FormErrorsBox from '@newtash/core/FormErrorsBox';
import Button from '@newtash/core/Button';
import { TextInput } from '@newtash/core/Input';
// import { useForm } from '@newtash/core/hooks';
import { useFormState } from '../../providers/form-context';
import { ART_MAIN_CRUD_URL } from '../../config';

type Props = {
  data: Data,
  validationErrors: Object,
  fetchFormData: Object => void,
  clearValidationErrors: () => void,
};

const Form = (props: Props) => {
  const {
    data,
    validationErrors,
    fetchFormData,
    clearValidationErrors,
  } = props;

  const { t } = useTranslation(['pages', 'common']);
  const history = useHistory();
  const { action, id } = useParams();

  const {
    formData,
    setFormData,
    setPropValue,
    getPropValue,
    getPropHasErrors,
  } = useFormState();
  // console.log('formData:', state, formData);

  // const { setPropValue } = useForm(data, validationErrors);

  useEffect(() => {
    if (id && fetchFormData) {
      fetchFormData({
        url: [ART_MAIN_CRUD_URL, id].join('/'),
      });
    }
  }, [id, fetchFormData]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      console.log('### data useEffect', data);
      setFormData(data);
    }
  }, [data, setFormData]);

  const handleBackButtonClick = () => {
    history.goBack();
  };

  // const saveCallback = (response: AxiosResponseProps) => {
  //   console.log('saveCallback:', response);
  //   // const { status } = response;
  //   // if (status !== RESPONSE_STATUS_UNPROCESSABLE_ENTITY && fetchArtGroups) {
  //   //   fetchArtGroups();
  //   //   doDismiss();
  //   // }
  // };

  // const handleSaveClick = () => {
  //   // const payload = {
  //   //   url: ART_GROUPS_CRUD_URL,
  //   //   data: formData,
  //   // };
  //   // if (saveForm) {
  //   //   saveForm(payload, saveCallback);
  //   // }
  // };

  return (
    <Page>
      <PageHeader
        title={t(
          action === 'create'
            ? 'artMain.formTitleAdd'
            : 'artMain.formTitleEdit',
        )}
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
          <FormErrorsBox
            errors={validationErrors}
            onClear={clearValidationErrors}
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
        </Card>
        <Card>
          <pre>{JSON.stringify({ data, formData }, null, 2)}</pre>
        </Card>
      </PageContent>
    </Page>
  );
};

export default Form;
