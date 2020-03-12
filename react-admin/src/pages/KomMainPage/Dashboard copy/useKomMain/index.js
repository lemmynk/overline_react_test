// @flow
import { useState, useMemo, useEffect, useCallback } from 'react';
import qs from 'qs';
import { useApi, useAppErrors } from '@newtash/core';
import { useKomConfig, useKomMesta } from '../../../../state';
import { KOM_MAIN_CRUD_URL } from '../../../../config';

export default () => {
  const { api } = useApi();
  const { addAppError } = useAppErrors();
  const { vKoms } = useKomConfig();
  const { selectOptions } = useKomMesta();

  const [doFetch, setFetch] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [vKom, setVKom] = useState<number>(1);
  const [filterMesto, setFilterMesto] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortedKey, setSortedKey] = useState<string>('naziv');
  const [sortedAsc, setSortAscending] = useState<boolean>(true);
  const [artMains, setData] = useState<Object>({});

  const data = useMemo(() => artMains.data || [], [artMains.data]);
  const pagination = useMemo(() => artMains.pagination || {}, [
    artMains.pagination,
  ]);

  useEffect(() => {
    setFetch(true);
  }, [vKom, search, filterMesto, sortedKey, sortedAsc]);

  /**
   * Resolve request url
   */
  const buildFetchUrl = useCallback(
    (page: number = 1) => {
      const orderBy = sortedAsc ? sortedKey : `${sortedKey} DESC`;
      const parts = {
        vKom: `bit:${vKom}`,
        mestoId: filterMesto,
        s: search,
        orderBy,
        page,
      };
      const query = Object.keys(parts)
        .filter(key => parts[key] && parts[key].toString().length > 0)
        .reduce((acc, key: string) => ({ ...acc, [key]: parts[key] }), {});
      return [KOM_MAIN_CRUD_URL, qs.stringify(query)].join('?');
    },
    [vKom, filterMesto, search, sortedKey, sortedAsc],
  );

  /**
   * Make request
   */
  const fetchKomMains = useCallback(
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
      fetchKomMains();
    }
  }, [doFetch, fetchKomMains]);

  return {
    vKoms,
    vKom,
    setVKom,
    data,
    pagination,
    isFetching,
    komMestaSelectOptions: selectOptions,
    filterMesto,
    search,
    sortedKey,
    sortedAsc,

    setFilterMesto,
    setSearch,
    setSortedKey,
    setSortAscending,

    fetchKomMains,
  };
};
