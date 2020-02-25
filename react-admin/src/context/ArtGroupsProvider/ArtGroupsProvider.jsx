// @flow
import React, { type Node, useEffect } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { reducer, initialState, SET_ALL } from './reducer';

type Props = {
  children: Node,
};

const ArtGroupsContext = React.createContext<any>();

export const ArtGroupsProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // eslint-disable-next-line no-console
  console.log('ArtGroupsProvider render');

  const context = { state, dispatch };

  return (
    <ArtGroupsContext.Provider value={context}>
      {children}
    </ArtGroupsContext.Provider>
  );
};

export const useArtGroups = () => {
  const context = React.useContext(ArtGroupsContext);

  if (context === undefined) {
    throw new Error('useArtGroups must be used within ArtGroupsProvider');
  }

  const { state, dispatch } = context;
  const { vArtikl, data, isReady } = state;
  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const fetchData = React.useCallback(async () => {
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
      // fetchConfig();
    }
  }, [isReady, fetchConfig]);

  return {
    isReady,
    config,
    version,
    fetchConfig,
  };
};
