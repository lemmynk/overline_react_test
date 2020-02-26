// @flow
import { useReducer, useState, useEffect, useMemo, useCallback } from 'react';
import { useApi, useAppData } from '@newtash/core';
import { sortByKey } from '@newtash/core/utils';
import { reducer, initialState, SET_ALL } from './reducer';

export default (url: string) => {
  const { api } = useApi();
  const { config, isReady: isAppReady } = useAppData();
  const { artGroupDefaultVArtikl, artGroupVArtikli } = config;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isInitialised, setInitialised] = useState<boolean>(false);
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
