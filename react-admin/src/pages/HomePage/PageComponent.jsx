// @flow
import React from 'react';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';

const Home = () => {
  return (
    <Page>
      <PageHeader title="Home" description="Home page description" />
      <PageContent>
        <div>...home...</div>
      </PageContent>
    </Page>
  );
};

export default Home;
