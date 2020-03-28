// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MagConfigProvider,
  SearchProvider,
  DataFetchProvider,
  DataDeleteProvider,
} from '../../state';
import MagMainPage from './MagMainPage';
import { MAG_MAIN_CRUD_URL } from '../../config';

export default () => {
  const { t } = useTranslation('pages');

  const deleteConfirmProps = {
    deleteConfirmation: t('magMains.deleteConfirmation'),
  };
  const deleteErrorMsg = t('magMains.errors.delete-error');

  return (
    <SearchProvider>
      <DataFetchProvider baseUrl={MAG_MAIN_CRUD_URL} sortBy="magNaziv">
        <DataDeleteProvider
          baseUrl={MAG_MAIN_CRUD_URL}
          deleteConfirmProps={deleteConfirmProps}
          deleteErrorMsg={deleteErrorMsg}
        >
          <MagConfigProvider>
            <MagMainPage />
          </MagConfigProvider>
        </DataDeleteProvider>
      </DataFetchProvider>
    </SearchProvider>
  );
};
