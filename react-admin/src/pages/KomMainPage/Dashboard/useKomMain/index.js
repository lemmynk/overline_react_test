// @flow
import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import {
  useKomConfig,
  useKomMesta,
  useSearch,
  useDataFetch,
} from '../../../../state';
import { cleanEmpty } from '../../../../utils';

export default () => {
  const { vKoms } = useKomConfig();
  const { selectOptions } = useKomMesta();
  const { search, setSearch } = useSearch();
  const { search: locationSearch } = useLocation();
  const {
    isFetching,
    data,
    pagination,
    sortedKey,
    setSortedKey,
    sortedAsc,
    setSortAscending,
    doFetch,
  } = useDataFetch();

  const { vKom: qVKom, mestoId } = qs.parse(locationSearch, {
    ignoreQueryPrefix: true,
  });

  const [vKom, setVKom] = useState<number>(qVKom || '1');
  const [filterMesto, setFilterMesto] = useState<string>(mestoId || '');

  /**
   * Build request query
   */
  const fetchQuery = useCallback(
    (page: number) => {
      const orderBy = sortedAsc ? sortedKey : `${sortedKey} DESC`;
      return cleanEmpty({
        vKom: `bit:${vKom}`,
        mestoId: filterMesto,
        s: search,
        orderBy,
        page,
      });
    },
    [vKom, filterMesto, search, sortedAsc, sortedKey],
  );

  /**
   * Do fetch data
   */
  const fetchKomMains = useCallback(
    (page: number = 1) => {
      doFetch(fetchQuery(page));
    },
    [doFetch, fetchQuery],
  );

  /**
   * Fetch new data on dashboard fields change
   * TBC: it's fired on initial load as well (?!)
   */
  useEffect(() => {
    fetchKomMains();
  }, [fetchKomMains, vKom, filterMesto, search, sortedAsc, sortedKey]);

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
