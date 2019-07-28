// @flow
import React, { useEffect } from 'react';
import { Page, PageContent } from '@newtash/react-app-core';

type Props = {
  doInitApp: () => void,
};

const DashboardPageComponent = (props: Props) => {
  const { doInitApp } = props;

  useEffect(() => {
    if (doInitApp) {
      doInitApp();
    }
  }, []);

  return (
    <Page>
      <PageContent>
        <div>...</div>
      </PageContent>
    </Page>
  );
};

export default DashboardPageComponent;
