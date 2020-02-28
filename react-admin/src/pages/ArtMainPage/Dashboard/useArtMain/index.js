// @flow
import { useState, useMemo, useEffect } from 'react';
import { useAppData } from '@newtash/core';
// import { useApi, useAppData, useAppErrors } from '@newtash/core';
import { useArtGroups } from '../../../../providers';

export default (url: string) => {
  // const { api } = useApi();
  const { config, isReady: isAppReady } = useAppData();
  const { artGroupDefaultVArtikl, artGroupVArtikli } = config;
  // const { addAppError } = useAppErrors();
  const { selectOptions } = useArtGroups();

  const [isFetching] = useState<boolean>(false);
  const [vArtikl, setVArtikl] = useState<string>('');
  const [filterGroup, setFilterGroup] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const vArtikli = useMemo(() => artGroupVArtikli || [], [artGroupVArtikli]);
  const isReady = isAppReady;
  const artGroupsSelectOptions = selectOptions(vArtikl);

  useEffect(() => {
    if (artGroupDefaultVArtikl) {
      setVArtikl(artGroupDefaultVArtikl);
    }
  }, [artGroupDefaultVArtikl]);

  return {
    isReady,
    isFetching,
    vArtikli,
    vArtikl,
    artGroupsSelectOptions,
    filterGroup,
    search,
    setVArtikl,
    setFilterGroup,
    setSearch,

    url,
  };
};
