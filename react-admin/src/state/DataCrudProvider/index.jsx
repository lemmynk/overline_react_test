// @flow
import React, { type Node, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Confirm from '@newtash/core/Confirm';
import { useApi, useAppErrors } from '@newtash/core';
import { rand } from '@newtash/core/utils';
import { useDataFetch } from '../DataFetchProvider';
import { useEnv } from '../../utils';

type Props = {
  baseUrl: string,
  deleteConfirmProps: Object,
  deleteErrorMsg: string,
  children: Node,
};

const DataCrudContext = React.createContext<any>();

export const DataCrudProvider = (props: Props) => {
  const { baseUrl, deleteConfirmProps, deleteErrorMsg, children } = props;

  const { t } = useTranslation('common');
  const { api } = useApi();
  const { addAppError } = useAppErrors();
  const { error422 } = useEnv();
  const { doFetch } = useDataFetch();

  const [crudId, setCrudId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [fetchQuery, setFetchQuery] = useState({ page: 1 });

  const { title, textConfirm, textCancel, deleteConfirmation } =
    deleteConfirmProps || {};
  const confirmStr = deleteConfirmation || t('deleteConfirmation');

  const handleDeleteConfirmation = () => {
    api
      .delete([baseUrl, crudId].join('/'))
      .then(response => response.status)
      .then(status => {
        const isDeleted = status !== error422;
        if (!isDeleted) {
          addAppError(deleteErrorMsg || t('deleteErrorMsg'));
        }
        return isDeleted;
      })
      .then(() => {
        setIsOpen(false);
        doFetch(fetchQuery);
      })
      .catch(err => {
        addAppError(err);
      });
  };

  const context = {
    baseUrl,
    crudId,
    setCrudId,
    isOpen,
    setIsOpen,
    setFetchQuery,
  };

  return (
    <DataCrudContext.Provider value={context}>
      {children}
      <Confirm
        isOpen={isOpen}
        title={title || t('areYouSure')}
        textConfirm={textConfirm || t('Yes')}
        textCancel={textCancel || t('No')}
        onConfirm={handleDeleteConfirmation}
        onDismiss={() => setIsOpen(false)}
      >
        {confirmStr.split('|').map(str => (
          <p key={rand()}>{str}</p>
        ))}
      </Confirm>
    </DataCrudContext.Provider>
  );
};

export const useDataCrud = () => {
  const context = React.useContext(DataCrudContext);

  if (context === undefined) {
    throw new Error('useDataCrud must be used within DataCrudProvider');
  }

  const { crudId, setCrudId, setIsOpen, setFetchQuery } = context;

  /**
   * Display Delete Confirm dialog
   */
  const doDelete = (id: number) => {
    setCrudId(id);
    setIsOpen(true);
  };

  return { crudId, setCrudId, setIsOpen, doDelete, setFetchQuery };
};
