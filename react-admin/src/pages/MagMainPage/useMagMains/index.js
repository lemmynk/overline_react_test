// @flow
import { useState, useEffect, useCallback } from 'react';
import {
  useMagConfig,
  useSearch,
  useDataFetch,
  useDataDelete,
} from '../../../state';
import { cleanEmpty } from '../../../utils';

export default () => {
  const { vPromets, defaultVPromet } = useMagConfig();
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

  const { formId, setFormId, setIsOpen, setFetchQuery } = useDataDelete();

  const [vPromet, setVPromet] = useState<string>('');

  /**
   * Build request query
   */
  const fetchQuery = useCallback(
    (page: number) => {
      const orderBy = sortedAsc ? sortedKey : `${sortedKey} DESC`;
      return cleanEmpty({
        vPromet,
        s: search,
        orderBy,
        page,
      });
    },
    [vPromet, search, sortedAsc, sortedKey],
  );

  /**
   * Do fetch data
   */
  const fetchMagMains = useCallback(
    (page: number = 1) => {
      doFetch(fetchQuery(page));
    },
    [doFetch, fetchQuery],
  );

  /**
   Open Delete Confirmation modal
   */
  const deleteItem = (id: number) => {
    setFetchQuery({ vPromet, page: 1 });
    setFormId(id);
    setIsOpen(true);
  };

  /**
   * Fetch new data on dashboard fields change
   * TBC: it's fired on initial load as well (?!)
   */
  useEffect(() => {
    fetchMagMains();
  }, [fetchMagMains, vPromet, search, sortedAsc, sortedKey]);

  useEffect(() => {
    if (defaultVPromet) {
      setVPromet(defaultVPromet);
    }
  }, [defaultVPromet]);

  return {
    isFetching,
    vPromets,
    vPromet,
    search,
    sortedKey,
    sortedAsc,
    formId,
    data,
    pagination,

    setVPromet,
    setSearch,
    setSortedKey,
    setSortAscending,
    setFormId,

    fetchMagMains,
    deleteItem,
  };
};
