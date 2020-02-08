// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import Tab from '@newtash/core/Tab';

type Props = {
  vArtikl: string,
  data: Array<Object>,
  setArtGroupsVArtikl: string => void,
};

const tabs = [
  { key: 'roba', title: 'Roba' },
  { key: 'usluga', title: 'Usluga' },
];

export default (props: Props) => {
  const { vArtikl, data, setArtGroupsVArtikl } = props;

  const [t] = useTranslation('pages');

  const handleTabChange = (key: string) => {
    if (setArtGroupsVArtikl) {
      setArtGroupsVArtikl(key);
    }
  };

  const renderTitle = () => <div>...search...</div>;

  return (
    <Page>
      <PageHeader
        title={t('artGroups.title')}
        description={t('artGroups.description')}
      />
      <PageContent>
        <Card>
          <Tab
            tabs={tabs}
            selectedTab={vArtikl}
            renderTitle={renderTitle}
            onChange={handleTabChange}
          />
          <pre>{JSON.stringify({ vArtikl, data }, null, 2)}</pre>
        </Card>
      </PageContent>
    </Page>
  );
};
