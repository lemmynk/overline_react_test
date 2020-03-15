// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SearchProvider,
  DataFetchProvider,
  DataDeleteProvider,
} from '../../state';
import KomMestaPage from './KomMestaPage';
import { KOM_MESTA_CRUD_URL } from '../../config';

export default () => {
  const { t } = useTranslation('komPages');

  const deleteConfirmProps = {
    deleteConfirmation: t('komMesta.deleteConfirmation'),
  };
  const deleteErrorMsg = t('komMesta.errors.delete-error');
  return (
    <SearchProvider>
      <DataFetchProvider baseUrl={KOM_MESTA_CRUD_URL}>
        <DataDeleteProvider
          baseUrl={KOM_MESTA_CRUD_URL}
          deleteConfirmProps={deleteConfirmProps}
          deleteErrorMsg={deleteErrorMsg}
        >
          <KomMestaPage />
        </DataDeleteProvider>
      </DataFetchProvider>
    </SearchProvider>
  );
};
