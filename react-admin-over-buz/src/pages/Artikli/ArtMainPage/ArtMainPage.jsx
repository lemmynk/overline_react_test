import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Page,
  PageHeader,
  PageContent,
  PrimaryButton,
} from '@newtash/react-app-core';
import Dashboard from './Dashboard';
import Form from './Form';
import {
  CRUD_URL_CREATE,
  CRUD_URL_EDIT,
  // CRUD_URL_VIEW,
} from '../../../config';

const ArtMainPage = () => {
  const { t } = useTranslation('art');

  const [route, setRoute] = useState('');

  const renderHeaderButtons = useCallback(() => {
    switch (route) {
      case CRUD_URL_CREATE:
      case CRUD_URL_EDIT:
        return (
          <PrimaryButton
            text={t('formButtonBack')}
            onClick={() => setRoute('')}
          />
        );
      default:
        return (
          <PrimaryButton
            text={t('artMain.createButtonTitle')}
            onClick={() => setRoute('create')}
          />
        );
    }
  });

  return (
    <Page>
      <PageHeader
        title={t('artMain.dahboardTitle')}
        renderButtons={renderHeaderButtons}
      />
      <PageContent>
        {!route && <Dashboard />}
        {route === CRUD_URL_CREATE && <Form />}
        {route === CRUD_URL_EDIT && <Form />}
      </PageContent>
    </Page>
  );
};

export default ArtMainPage;
