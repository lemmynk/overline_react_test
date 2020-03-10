// @flow
import React, { useEffect, useState } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { ART_CONFIG_URL } from '../../config';

const ArtConfigContext = React.createContext<any>();

export const ArtConfigProvider = ({ children }: ProviderProps) => {
  const [vArtikli, setVArtikli] = useState([]);
  const [defaultVArtikl, setDefaultVArtikl] = useState('roba');
  const [doFetch, setDoFetch] = useState(false);

  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const context = {
    vArtikli,
    defaultVArtikl,
  };

  useEffect(() => {
    if (doFetch) {
      setDoFetch(false);
      Promise.all([
        api.get(`${ART_CONFIG_URL}/default`),
        api.get(`${ART_CONFIG_URL}/vArtikli`),
      ])
        .then(response => response.map(item => item.data))
        .then(response => response.map(item => item.data))
        .then(([dV, vArs]) => {
          setDefaultVArtikl(dV);
          setVArtikli(vArs);
        })
        .catch(err => addAppError(err));
    }
  }, [doFetch, api, setDefaultVArtikl, setVArtikli, addAppError]);

  useEffect(() => {
    setDoFetch(true);
  }, [setDoFetch]);

  return (
    <ArtConfigContext.Provider value={context}>
      {children}
    </ArtConfigContext.Provider>
  );
};

export const useArtConfig = () => {
  const context = React.useContext(ArtConfigContext);

  if (context === undefined) {
    throw Error('useArtConfig must be used within ArtConfigProvider');
  }

  return context;
};
