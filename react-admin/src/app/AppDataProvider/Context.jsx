// @flow
import React, { type Node, useEffect, useState } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { useAppConfig } from '../AppConfigProvider';
import { APP_CONFIG_URL } from '../../config';

type Props = {
  children: Node,
};

const AppDataContext = React.createContext<any>();

export const AppDataProvider = ({ children }: Props) => {
  const [isInitialised, setInitialised] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { api } = useApi();
  const { addAppError } = useAppErrors();
  const { config, setConfig } = useAppConfig();

  // eslint-disable-next-line no-console
  console.log('AppDataProvider render', isInitialised);

  const context = {
    isReady,
    config,
  };

  /**
   * Trigger this effect to load appData (config)
   */
  useEffect(() => {
    const fetchAppConfig = async () => {
      try {
        const r = await api.get(`${APP_CONFIG_URL}?v=0`);
        const data = await r.data;
        await setConfig(data);
        return true;
      } catch (err) {
        addAppError(err);
        return false;
      }
    };

    if (!isInitialised) {
      setInitialised(true);
      fetchAppConfig().then(() => setIsReady(true));
    }
  }, [isInitialised, api, setConfig, addAppError]);

  return (
    <AppDataContext.Provider value={context}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useApp = () => {
  const context = React.useContext(AppDataContext);

  if (context === undefined) {
    throw new Error('useApp must be used witihin AppDataProvider');
  }

  return context;
};
