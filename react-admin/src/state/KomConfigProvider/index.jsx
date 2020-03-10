// @flow
import React, { useState, useEffect } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { KOM_CONFIG_URL } from '../../config';

const KomConfigContext = React.createContext<any>();

export const KomConfigProvider = ({ children }: ProviderProps) => {
  const [vKoms, setVKoms] = useState([]);
  const [doFetch, setDoFetch] = useState(false);

  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const context = {
    vKoms,
  };

  useEffect(() => {
    if (doFetch) {
      setDoFetch(false);
      api
        .get(`${KOM_CONFIG_URL}/vKoms`)
        .then(response => response.data)
        .then(response => response.data)
        .then(response => setVKoms(response))
        .catch(err => addAppError(err));
    }
  }, [doFetch, api, setVKoms, addAppError]);

  useEffect(() => {
    setDoFetch(true);
  }, [setDoFetch]);

  return (
    <KomConfigContext.Provider value={context}>
      {children}
    </KomConfigContext.Provider>
  );
};

export const useKomConfig = () => {
  const context = React.useContext(KomConfigContext);

  if (context === undefined) {
    throw new Error('useKomConfig must be used within KomConfigProvider');
  }

  return context;
};
