// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import { useAppConfig } from '../../app/AppConfigProvider';

export default () => {
  const { isReady, config, version, fetchConfig } = useAppConfig();

  const [t] = useTranslation('pages');

  return (
    <Page>
      <PageHeader
        title={t('settings.title')}
        description={t('settings.description')}
      />
      <PageContent>
        <button type="button" onClick={fetchConfig}>
          FETCH
        </button>
        <pre>{JSON.stringify({ isReady, config, version }, null, 2)}</pre>
      </PageContent>
    </Page>
  );
};
