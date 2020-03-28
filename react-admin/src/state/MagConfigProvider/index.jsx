// @flow
import React, { type Node, useState, useEffect } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { MAG_CONFIG_URL } from '../../config';

type Props = {
  children: Node,
};

const MagConfigContext = React.createContext<any>();

export const MagConfigProvider = ({ children }: Props) => {
  const [vPromets, setVPromets] = useState([]);
  const [defaultVPromet, setDefaultVPromet] = useState('mp');
  const [doFetch, setDoFetch] = useState(false);

  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const context = { vPromets, defaultVPromet };

  useEffect(() => {
    if (doFetch) {
      setDoFetch(false);
      Promise.all([
        api.get(`${MAG_CONFIG_URL}/default`),
        api.get(`${MAG_CONFIG_URL}/vPromets`),
      ])
        .then(response => response.map(item => item.data))
        .then(response => response.map(item => item.data))
        .then(([dp, vps]) => {
          setDefaultVPromet(dp);
          setVPromets(vps);
        })
        .catch(err => addAppError(err));
    }
  }, [doFetch, api, setVPromets, setDefaultVPromet, addAppError]);

  useEffect(() => {
    setDoFetch(true);
  }, [setDoFetch]);

  return (
    <MagConfigContext.Provider value={context}>
      {children}
    </MagConfigContext.Provider>
  );
};

export const useMagConfig = () => {
  const context = React.useContext(MagConfigContext);

  if (context === undefined) {
    throw new Error('useMagConfig must be used within MagConfigProvider');
  }

  return context;
};
