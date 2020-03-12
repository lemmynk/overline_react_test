// @flow
import { useState, useCallback } from 'react';
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

  const [vKom, setVKom] = useState<number>(1);
  const [filterMesto, setFilterMesto] = useState<string>('');

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
