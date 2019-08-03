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

const ArtMainPage = () => {
  const { t } = useTranslation('art');

  const [route, setRoute] = useState('');

  const renderHeaderButtons = useCallback(() => {
    switch (route) {
      case '':
        return (
          <PrimaryButton
            text={t('createButtonTitle')}
            onClick={() => setRoute('create')}
          />
        );
      case 'create':
        return (
          <PrimaryButton
            text={t('formButtonBack')}
            onClick={() => setRoute('')}
          />
        );
      default:
        return null;
    }
  });

  return (
    <Page>
      <PageHeader
        title={t('dahboardTitle')}
        renderButtons={renderHeaderButtons}
      />
      <PageContent>
        {!route && <Dashboard />}
        {route === 'create' && <Form />}
      </PageContent>
    </Page>
  );
};

export default ArtMainPage;
