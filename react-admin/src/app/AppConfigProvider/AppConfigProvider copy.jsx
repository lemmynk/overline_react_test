// @flow
import React, { type Node, useEffect } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { reducer, initialState, SET_ALL } from './reducer';

type Props = {
  children: Node,
};

const AppConfigContext = React.createContext<any>();

export const AppConfigProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // eslint-disable-next-line no-console
  console.log('AppConfigProvider render');

  const context = { state, dispatch };

  return (
    <AppConfigContext.Provider value={context}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = React.useContext(AppConfigContext);

  if (context === undefined) {
    throw new Error('useAppConfig must be used within AppConfigProvider');
  }

  const { state, dispatch } = context;
  const { data: config, version, isReady } = state;
  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const fetchConfig = React.useCallback(async () => {
    try {
      const response = await api.get(`/app-config/api?v=${version}`);
      const responseData = await response.data;
      const payload = {
        ...responseData,
        isReady: true,
      };
      dispatch({ type: SET_ALL, payload });
      return true;
    } catch (err) {
      addAppError(err);
      return false;
    }
  }, [api, dispatch, addAppError, version]);

  useEffect(() => {
    if (!isReady) {
      fetchConfig();
    }
  }, [isReady, fetchConfig]);

  return {
    isReady,
    config,
    version,
    fetchConfig,
  };
};
