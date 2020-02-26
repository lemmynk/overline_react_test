// @flow
import React from 'react';
import Page from './Page';
import { ArtGroupsProvider } from './ArtGroupsProvider';
import { ArtGroupsCrudProvider } from './ArtGroupsCrudProvider';

export default () => (
  <ArtGroupsProvider>
    <ArtGroupsCrudProvider>
      <Page />
    </ArtGroupsCrudProvider>
  </ArtGroupsProvider>
);
