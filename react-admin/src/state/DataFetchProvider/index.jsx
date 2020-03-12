// @flow
import React, { type Node, useState, useMemo, useCallback } from 'react';
import qs from 'qs';
import { useApi, useAppErrors } from '@newtash/core';
import {
  FETCH_STATUS_FETCHING,
  FETCH_STATUS_SUCCEEDED,
  FETCH_STATUS_FAILED,
} from '../../config';

type Props = {
  baseUrl: string,
  sortBy: string,
  children: Node,
};

const DataFetchContext = React.createContext<any>();

export const DataFetchProvider = ({ baseUrl, sortBy, children }: Props) => {
  if (!baseUrl) {
    throw new Error('baseUrl must be defined');
  }

  const [fetching, setFetching] = useState('');
  const [state, setState] = useState({});
  const [sortedKey, setSortedKey] = useState<string>(sortBy || '');
  const [sortedAsc, setSortAscending] = useState<boolean>(true);

  const context = {
    baseUrl,
    fetching,
    setFetching,
    state,
    setState,
    sortedKey,
    setSortedKey,
    sortedAsc,
    setSortAscending,
  };

  return (
    <DataFetchContext.Provider value={context}>
      {children}
    </DataFetchContext.Provider>
  );
};

export const useDataFetch = () => {
  const context = React.useContext(DataFetchContext);
  const { api } = useApi();
  const { addAppError } = useAppErrors();

  if (context === undefined) {
    throw new Error('useDataFetch must be used within DataFetchProvider');
  }

  const { baseUrl, fetching, setFetching, state, setState } = context;

  const url = useMemo(() => baseUrl, [baseUrl]);

  const isFetching = fetching === FETCH_STATUS_FETCHING;
  const isSucceeded = fetching === FETCH_STATUS_SUCCEEDED;
  const isFailed = fetching === FETCH_STATUS_FAILED;

  const data = state.data || [];
  const pagination = state.pagination || {};

  const resolveUrl = useCallback(
    (query: Object) => {
      if (Object.keys(query).length > 0) {
        const fetchUrl = [baseUrl, qs.stringify(query)].join('?');
        console.log(fetchUrl);
        return fetchUrl;
      }
      return baseUrl;
    },
    [baseUrl],
  );

  const doFetch = useCallback(
    (query: Object = {}) => {
      setFetching(FETCH_STATUS_FETCHING);
      return api
        .get(resolveUrl(query))
        .then(response => response.data)
        .then(response => {
          setState(response);
          setFetching(FETCH_STATUS_SUCCEEDED);
        })
        .catch(err => {
          setFetching(FETCH_STATUS_FAILED);
          addAppError(err);
        });
    },
    [api, addAppError, resolveUrl, setState, setFetching],
  );

  return {
    ...context,
    url,
    isFetching,
    isSucceeded,
    isFailed,
    data,
    pagination,
    doFetch,
  };
};
