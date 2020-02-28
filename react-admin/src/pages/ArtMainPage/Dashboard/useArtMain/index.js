// @flow
import { useState, useMemo, useEffect } from 'react';
import { useAppData } from '@newtash/core';
// import { useApi, useAppData, useAppErrors } from '@newtash/core';

export default (url: string) => {
  // const { api } = useApi();
  const { config, isReady: isAppReady } = useAppData();
  // const { addAppError } = useAppErrors();
  const { artGroupDefaultVArtikl, artGroupVArtikli } = config;

  const [vArtikl, setVArtikl] = useState<string>('');
  const [isFetching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const vArtikli = useMemo(() => artGroupVArtikli || [], [artGroupVArtikli]);
  const isReady = isAppReady;

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
    search,
    setVArtikl,
    setSearch,

    url,
  };
};
