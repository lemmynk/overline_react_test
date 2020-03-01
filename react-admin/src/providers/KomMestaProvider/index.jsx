// @flow
import React, { type Node, useState, useEffect, useMemo } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { sortByKey } from '@newtash/core/utils';
import { KOM_MESTA_CRUD_URL } from '../../config';

type ProviderProps = {
  children: Node,
};

const KomMestaContext = React.createContext<any>();

export const KomMestaProvider = ({ children }: ProviderProps) => {
  const [mesta, setMesta] = useState([]);
  const [doFetch, setDoFetch] = useState(false);

  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const context = { mesta, setMesta };

  useEffect(() => {
    if (doFetch) {
      setDoFetch(false);
      api
        .get(KOM_MESTA_CRUD_URL)
        .then(response => response.data)
        .then(response => response.filter(item => item.deletedAt === null))
        .then(response => setMesta(response))
        .catch(err => addAppError(err));
    }
  }, [doFetch, api, addAppError, setMesta]);

  useEffect(() => {
    setDoFetch(true);
  }, [setDoFetch]);

  return (
    <KomMestaContext.Provider value={context}>
      {children}
    </KomMestaContext.Provider>
  );
};

export const useKomMesta = () => {
  const context = React.useContext(KomMestaContext);

  if (context === undefined) {
    throw new Error('useKomMesta must be used within KomMestaProvider');
  }

  const { mesta } = context;

  const selectOptions = useMemo(
    () =>
      mesta
        .map(item => ({
          key: item.id,
          text: item.naziv,
        }))
        .sort(sortByKey('text')),
    [mesta],
  );

  return {
    mesta,
    selectOptions,
  };
};
