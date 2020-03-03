// @flow
import React, { type Node, useState, useEffect, useCallback } from 'react';
import { useApi, useAppErrors } from '@newtash/core';
import { sortByKey } from '@newtash/core/utils';
import { ART_GROUPS_CRUD_URL } from '../../config';

type ProviderProps = {
  children: Node,
};

const ArtGroupsContext = React.createContext<any>();

export const ArtGroupsProvider = ({ children }: ProviderProps) => {
  const [groups, setGroups] = useState([]);
  const [doFetch, setDoFetch] = useState(false);

  const { api } = useApi();
  const { addAppError } = useAppErrors();

  const context = { groups, setGroups };

  useEffect(() => {
    if (doFetch) {
      setDoFetch(false);
      api
        .get(ART_GROUPS_CRUD_URL)
        .then(response => response.data)
        .then(response => response.data.filter(item => item.deletedAt === null))
        .then(response => setGroups(response))
        .catch(err => addAppError(err));
    }
  }, [doFetch, api, addAppError, setGroups]);

  useEffect(() => {
    setDoFetch(true);
  }, [setDoFetch]);

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

  const { groups } = context;

  const selectOptions = useCallback(
    (vArtikl: string) =>
      groups
        .filter(item => item.vArtikl === vArtikl)
        .map(item => ({
          key: item.id,
          text: item.grpNaziv,
        }))
        .sort(sortByKey('text')),
    [groups],
  );

  return {
    groups,
    selectOptions,
  };
};
