// @flow
import { useCallback, useEffect } from 'react';
import { useSearch, useDataFetch, useDataDelete } from '../../../state';
import { cleanEmpty } from '../../../utils';

export default () => {
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

  const { formId, setFormId, setIsOpen } = useDataDelete();

  /**
   * Build request query
   */
  const fetchQuery = useCallback(
    (page: number) => {
      const orderBy = sortedAsc ? sortedKey : `${sortedKey} DESC`;
      return cleanEmpty({
        s: search,
        orderBy,
        page,
      });
    },
    [search, sortedAsc, sortedKey],
  );

  /**
   * Do fetch data
   */
  const fetchKomMesta = useCallback(
    (page: number = 1) => {
      doFetch(fetchQuery(page));
    },
    [doFetch, fetchQuery],
  );

  /**
   Open Delete Confirmation modal
   */
  const deleteItem = (id: number) => {
    setFormId(id);
    setIsOpen(true);
  };

  /**
   * Fetch new data on dashboard fields change
   * TBC: it's fired on initial load as well (?!)
   */
  useEffect(() => {
    fetchKomMesta();
  }, [fetchKomMesta, search, sortedAsc, sortedKey]);

  return {
    isFetching,
    search,
    sortedKey,
    sortedAsc,
    data,
    pagination,
    setSearch,
    setSortedKey,
    setSortAscending,
    fetchKomMesta,

    formId,
    setFormId,
    deleteItem,
  };
};
