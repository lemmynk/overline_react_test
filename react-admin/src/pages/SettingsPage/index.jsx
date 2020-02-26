// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import { useAppData } from '@newtash/core';

export default () => {
  const { isReady, config } = useAppData();

  const [t] = useTranslation('pages');

  return (
    <Page>
      <PageHeader
        title={t('settings.title')}
        description={t('settings.description')}
      />
      <PageContent>
        <pre>{JSON.stringify({ isReady, config }, null, 2)}</pre>
      </PageContent>
    </Page>
  );
};
