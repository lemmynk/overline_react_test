// @flow
import { useState, useEffect, useCallback } from 'react';
import {
  useArtConfig,
  useSearch,
  useDataFetch,
  useDataDelete,
} from '../../../state';
import { cleanEmpty } from '../../../utils';

export default () => {
  const { vArtikli, defaultVArtikl } = useArtConfig();
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

  const [vArtikl, setVArtikl] = useState<string>('');

  /**
   * Build request query
   */
  const fetchQuery = useCallback(
    (page: number) => {
      const orderBy = sortedAsc ? sortedKey : `${sortedKey} DESC`;
      return cleanEmpty({
        vArtikl,
        s: search,
        orderBy,
        page,
      });
    },
    [vArtikl, search, sortedAsc, sortedKey],
  );

  /**
   * Do fetch data
   */
  const fetchArtGroups = useCallback(
    (page: number = 1) => {
      doFetch(fetchQuery(page));
    },
    [doFetch, fetchQuery],
  );

  /**
   Open Delete Confirmation modal
   */
  const deleteItem = (id: number) => {
    setFetchQuery({ vArtikl, page: 1 });
    setFormId(id);
    setIsOpen(true);
  };

  /**
   * Fetch new data on dashboard fields change
   * TBC: it's fired on initial load as well (?!)
   */
  useEffect(() => {
    fetchArtGroups();
  }, [fetchArtGroups, vArtikl, search, sortedAsc, sortedKey]);

  useEffect(() => {
    if (defaultVArtikl) {
      setVArtikl(defaultVArtikl);
    }
  }, [defaultVArtikl]);

  return {
    isFetching,
    vArtikli,
    vArtikl,
    search,
    sortedKey,
    sortedAsc,
    formId,
    data,
    pagination,

    setVArtikl,
    setSearch,
    setSortedKey,
    setSortAscending,
    setFormId,

    fetchArtGroups,
    deleteItem,
  };
};
