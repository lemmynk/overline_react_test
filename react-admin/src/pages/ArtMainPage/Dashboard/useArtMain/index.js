// @flow
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import {
  useArtGroups,
  useArtConfig,
  useSearch,
  useDataFetch,
} from '../../../../state';
import { cleanEmpty } from '../../../../utils';

export default () => {
  const { defaultVArtikl, vArtikli } = useArtConfig();
  const { selectOptions } = useArtGroups();
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

  const { vArtikl: qVArtikl, grpId } = qs.parse(locationSearch, {
    ignoreQueryPrefix: true,
  });

  const [vArtikl, setVArtikl] = useState<string>(qVArtikl || defaultVArtikl);
  const [filterGroup, setFilterGroup] = useState<string>(grpId || '');

  const artGroupsSelectOptions = selectOptions(vArtikl);

  /**
   * Build request query
   */
  const fetchQuery = useCallback(
    (page: number) => {
      const orderBy = sortedAsc ? sortedKey : `${sortedKey} DESC`;
      return cleanEmpty({
        vArtikl,
        grpId: filterGroup,
        s: search,
        orderBy,
        page,
      });
    },
    [vArtikl, filterGroup, search, sortedAsc, sortedKey],
  );

  /**
   * Do fetch data
   */
  const fetchArtMains = useCallback(
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
    fetchArtMains();
  }, [fetchArtMains, vArtikl, filterGroup, search, sortedAsc, sortedKey]);

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
