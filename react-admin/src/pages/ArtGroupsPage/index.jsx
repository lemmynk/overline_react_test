// @flow
import React from 'react';
import { ArtConfigProvider } from '../../state';
import ArtGroupsPage from './ArtGroupsPage';

export default () => (
  <ArtConfigProvider>
    <ArtGroupsPage />
  </ArtConfigProvider>
);
