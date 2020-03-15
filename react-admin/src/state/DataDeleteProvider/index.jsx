// @flow
import React, { type Node, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Confirm from '@newtash/core/Confirm';
import { rand } from '@newtash/core/utils';
import { useApi, useAppErrors } from '@newtash/core';
import { useDataFetch } from '../DataFetchProvider';
import { useEnv } from '../../utils';

type Props = {
  baseUrl: string,
  deleteConfirmProps: Object,
  deleteErrorMsg: string,
  children: Node,
};

const DataDeleteContext = React.createContext<any>();

export const DataDeleteProvider = (props: Props) => {
  const { t } = useTranslation('common');
  const { api } = useApi();
  const { addAppError } = useAppErrors();
  const { error422 } = useEnv();

  const { baseUrl, deleteConfirmProps, deleteErrorMsg, children } = props;
  const { doFetch } = useDataFetch();

  const [formId, setFormId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [fetchQuery, setFetchQuery] = useState({ page: 1 });

  const context = {
    baseUrl,
    formId,
    setFormId,
    isOpen,
    setIsOpen,
    setFetchQuery,
  };

  const { title, textConfirm, textCancel, deleteConfirmation } =
    deleteConfirmProps || {};
  const confirmStr = deleteConfirmation || t('deleteConfirmation');

  const handleDeleteConfirmation = () => {
    api
      .delete([baseUrl, formId].join('/'))
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

  return (
    <DataDeleteContext.Provider value={context}>
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
    </DataDeleteContext.Provider>
  );
};

export const useDataDelete = () => {
  const context = React.useContext(DataDeleteContext);

  if (context === undefined) {
    throw new Error('useDataDelete must be used within DataDeleteProvider');
  }

  const { formId, setFormId, setIsOpen, setFetchQuery } = context;

  /**
   * Display Delete Confirm dialog
   */
  const doDelete = (id: number) => {
    setFormId(id);
    setIsOpen(true);
  };

  return { formId, setFormId, setIsOpen, doDelete, setFetchQuery };
};
