// @flow
import React from 'react';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import { useWhoAmI } from '@newtash/core';

const Home = () => {
  const { whoAmI } = useWhoAmI();

  return (
    <Page>
      <PageHeader title="Home" description="Home page description" />
      <PageContent>
        <div>...home...</div>
        <pre>{JSON.stringify({ whoAmI }, null, 2)}</pre>
      </PageContent>
    </Page>
  );
};

export default Home;
