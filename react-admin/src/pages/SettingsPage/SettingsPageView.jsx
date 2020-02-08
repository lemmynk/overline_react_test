// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';

type Props = {
  data: Object,
  appConfig: (string, any) => any,
};

export default (props: Props) => {
  const { data, appConfig } = props;

  const [t] = useTranslation('pages');

  const lang = appConfig('appLanguage', 'bbb');

  return (
    <Page>
      <PageHeader
        title={t('settings.title')}
        description={t('settings.description')}
      />
      <PageContent>
        <pre>{JSON.stringify({ data, lang }, null, 2)}</pre>
      </PageContent>
    </Page>
  );
};
