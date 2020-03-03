// @flow
import React from 'react';
import { ArtConfigProvider } from '../../context';
import ArtGroupsPage from './ArtGroupsPage';

export default () => (
  <ArtConfigProvider>
    <ArtGroupsPage />
  </ArtConfigProvider>
);
