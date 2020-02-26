// @flow
import { useReducer, useState, useEffect, useMemo, useCallback } from 'react';
import { useApi } from '@newtash/core';
import { sortByKey } from '@newtash/core/utils';
import { useApp } from '../../../app';
import { reducer, initialState, SET_ALL } from './reducer';

export default (url: string) => {
  const { api } = useApi();
  const { config, isReady: isAppReady } = useApp();
  const { artGroupDefaultVArtikl, artGroupVArtikli } = config;

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('### useArtGroups hook render', state);
  const [isInitialised, setInitialised] = useState<boolean>(false);
  // const [data, setData] = useState<Array<any>>([]);
  // const [dataVersion, setDataVersion] = useState<number>(0);
  // const [isDataReady, setIsDataReady] = useState<boolean>(false);
  const [vArtikl, setVArtikl] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortedKey, setSortedKey] = useState<string>('grpNaziv');
  const [sortedAsc, setSortAscending] = useState<boolean>(true);
  const [formId, setFormId] = useState<number>(0);

  // const data = useMemo(() => state ? state.data || [], [state]);
  // const dataVersion = useMemo(() => state ? state.version : 0, [state]);
  const { data, version: dataVersion, isReady: isDataReady } =
    state || initialState;

  const isReady = isAppReady && isDataReady;
  const vArtikli = useMemo(() => artGroupVArtikli || [], [artGroupVArtikli]);

  const filteredGroups: Array<any> = useMemo(
    () =>
      data
        .filter(item => item.vArtikl === vArtikl)
        .filter(item =>
          item.grpNaziv.toUpperCase().includes(search.toUpperCase()),
        )
        .sort(sortByKey(sortedKey, sortedAsc)),
    [data, search, sortedKey, sortedAsc, vArtikl],
  );

  const fetchData = useCallback(async () => {
    setInitialised(true);
    try {
      const response = await api.get(`${url}?v=${dataVersion}`);
      const payload = await response.data;
      // console.log(response);
      await dispatch({ type: SET_ALL, payload });
      return true;
    } catch (err) {
      return false;
    }
  }, [api, dataVersion, url, dispatch]);

  useEffect(() => {
    if (!isInitialised) {
      console.log('hook initialised');
      fetchData();
    }
  }, [isInitialised, fetchData]);

  useEffect(() => {
    if (artGroupDefaultVArtikl) {
      setVArtikl(artGroupDefaultVArtikl);
    }
  }, [artGroupDefaultVArtikl]);

  return {
    isReady,
    vArtikli,
    vArtikl,
    search,
    sortedKey,
    sortedAsc,
    formId,
    data,
    filteredGroups,

    setVArtikl,
    setSearch,
    setSortedKey,
    setSortAscending,
    setFormId,

    fetchData,
  };
};
