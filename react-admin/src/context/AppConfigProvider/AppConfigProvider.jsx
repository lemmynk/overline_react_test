// @flow
import React, { type Node, useEffect } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { reducer, initialState } from './reducer';

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
  const config = React.useMemo(() => state.data, [state.data]);
  const version = React.useMemo(() => state.version, [state.version]);
  const isReady = React.useMemo(() => !!state.isReady, [state.isReady]);
  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const fetchConfig = React.useCallback(() => {
    api
      .get(`/app-config/api?v=${version}`)
      .then(response => response.data)
      .then(response => {
        const payload = {
          ...response,
          isReady: true,
        };
        dispatch({ type: 'setState', payload });
      })
      .catch(err => addAppError(err));
  }, [api, version, dispatch, addAppError]);

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
