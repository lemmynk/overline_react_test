// @flow
import React, { type Node, useState, useEffect, useCallback } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { ART_PDV_CRUD_URL } from '../../config';

type ProviderProps = {
  children: Node,
};

const ArtPdvContext = React.createContext<any>();

export const ArtPdvProvider = ({ children }: ProviderProps) => {
  const [doFetch, setDoFetch] = useState(false);
  const [pdvs, setPdvs] = useState([]);

  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const context = { pdvs, setPdvs };

  useEffect(() => {
    if (doFetch) {
      setDoFetch(false);
      api
        .get(ART_PDV_CRUD_URL)
        .then(response => response.data)
        .then(response => response.filter(item => item.deletedAt === null))
        .then(response => setPdvs(response))
        .catch(err => addAppError(err));
    }
  }, [doFetch, api, addAppError, setPdvs]);

  useEffect(() => {
    setDoFetch(true);
  }, [setDoFetch]);

  return (
    <ArtPdvContext.Provider value={context}>{children}</ArtPdvContext.Provider>
  );
};

export const useArtPdv = () => {
  const context = React.useContext(ArtPdvContext);

  if (context === undefined) {
    throw new Error('useArtPdv must be used within ArtPdvProvider');
  }

  const { pdvs } = context;

  const selectOptions = useCallback(
    () =>
      pdvs.map(pdv => ({
        key: pdv.id,
        text: `${pdv.pdvOpis} - ${pdv.pdvStopa / 100}%`,
      })),
    [pdvs],
  );

  return {
    pdvs,
    selectOptions,
  };
};
