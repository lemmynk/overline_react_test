// @flow
import { useState, useMemo, useEffect, useCallback } from 'react';
import qs from 'qs';
import { useApi, useAppData, useAppErrors } from '@newtash/core';
import { useArtGroups } from '../../../../providers';

export default (url: string) => {
  const { api } = useApi();
  const { config } = useAppData();
  const { artGroupDefaultVArtikl, artGroupVArtikli } = config;
  const { addAppError } = useAppErrors();
  const { selectOptions } = useArtGroups();

  const [doFetch, setFetch] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [vArtikl, setVArtikl] = useState<string>('');
  const [filterGroup, setFilterGroup] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortedKey, setSortedKey] = useState<string>('artNaziv');
  const [sortedAsc, setSortAscending] = useState<boolean>(true);
  const [artMains, setData] = useState<Object>({});

  const vArtikli = useMemo(() => artGroupVArtikli || [], [artGroupVArtikli]);
  const artGroupsSelectOptions = selectOptions(vArtikl);
  const data = useMemo(() => artMains.data || [], [artMains.data]);
  const pagination = useMemo(() => {
    const paging = artMains.pagination || null;
    if (paging === null) {
      return {};
    }
    const { perPage, totalItems } = paging;
    return { ...paging, dataLength: Math.min(perPage, totalItems) };
  }, [artMains.pagination]);

  /**
   * Initial load of default vArtikl
   */
  useEffect(() => {
    if (artGroupDefaultVArtikl) {
      setVArtikl(artGroupDefaultVArtikl);
    }
  }, [artGroupDefaultVArtikl]);

  useEffect(() => {
    if (vArtikl) {
      setFetch(true);
    }
  }, [vArtikl, search, filterGroup, sortedKey, sortedAsc]);

  useEffect(() => {
    setFilterGroup('');
  }, [vArtikl]);

  /**
   * Resolve request url
   */
  const buildFetchUrl = useCallback(
    (page: number = 1) => {
      const orderBy = sortedAsc ? sortedKey : `${sortedKey} DESC`;
      const parts = {
        vArtikl,
        grpId: filterGroup,
        s: search,
        orderBy,
        page,
      };
      const query = Object.keys(parts)
        .filter(key => parts[key] && parts[key].toString().length > 0)
        .reduce((acc, key: string) => ({ ...acc, [key]: parts[key] }), {});
      return [url, qs.stringify(query)].join('?');
    },
    [url, vArtikl, filterGroup, search, sortedKey, sortedAsc],
  );

  /**
   * Make request
   */
  const fetchArtMains = useCallback(
    async (page: number = 1) => {
      setFetch(false);
      await setFetching(true);
      try {
        const fetchUrl = buildFetchUrl(page);
        // console.log('url:', fetchUrl);
        const response = await api.get(fetchUrl);
        const newData = await response.data;
        // console.log('response:', newData);
        await setData(newData);
        await setFetching(false);
        return true;
      } catch (err) {
        await addAppError(err);
        await setFetching(false);
        return false;
      }
    },
    [buildFetchUrl, api, setFetch, setFetching, setData, addAppError],
  );

  /**
   * Trigger fetching
   */
  useEffect(() => {
    if (doFetch) {
      fetchArtMains();
    }
  }, [doFetch, fetchArtMains]);

  return {
    data,
    pagination,
    isFetching,
    vArtikli,
    vArtikl,
    artGroupsSelectOptions,
    filterGroup,
    search,
    sortedKey,
    sortedAsc,

    setVArtikl,
    setFilterGroup,
    setSearch,
    setSortedKey,
    setSortAscending,

    fetchArtMains,
  };
};
