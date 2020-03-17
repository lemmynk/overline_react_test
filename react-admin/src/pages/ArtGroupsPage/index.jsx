// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArtConfigProvider,
  SearchProvider,
  DataFetchProvider,
  DataDeleteProvider,
} from '../../state';
import ArtGroupsPage from './ArtGroupsPage';
import { ART_GROUPS_CRUD_URL } from '../../config';

export default () => {
  const { t } = useTranslation('pages');

  const deleteConfirmProps = {
    deleteConfirmation: t('artGroups.deleteConfirmation'),
  };
  const deleteErrorMsg = t('artGroups.errors.delete-error');

  return (
    <SearchProvider>
      <DataFetchProvider baseUrl={ART_GROUPS_CRUD_URL} sortBy="grpNaziv">
        <DataDeleteProvider
          baseUrl={ART_GROUPS_CRUD_URL}
          deleteConfirmProps={deleteConfirmProps}
          deleteErrorMsg={deleteErrorMsg}
        >
          <ArtConfigProvider>
            <ArtGroupsPage />
          </ArtConfigProvider>
        </DataDeleteProvider>
      </DataFetchProvider>
    </SearchProvider>
  );
};
