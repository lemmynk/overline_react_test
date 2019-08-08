// @flow
import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NavTab,
  SearchBox,
  Table,
  FetchWrapper,
} from '@newtash/react-app-core';
import { FlexColumn, FlexColumnItem } from '../../../../components/Flex';
import { vArtikli } from '../../../../config';

type Props = {
  vArtikl: string,
  fetching: string,
  data: Array<ArtMainListProps>,
  filterText: string,
  setVArtikl: string => void,
  setFilterText: string => void,
  fetchData: number => void,
};

const DashboardComponent = (props: Props) => {
  const {
    vArtikl,
    fetching,
    data,
    filterText,
    setVArtikl,
    setFilterText,
    fetchData,
  } = props;

  const [t] = useTranslation('art');

  const doFetchData = (page: number) => fetchData(page);

  useEffect(() => {
    doFetchData(1);
  }, []);

  const handleNavTabItemClick = useCallback((item: NavTabItemProps) => {
    setVArtikl(item.key);
    setFilterText('');
    doFetchData(1);
  }, []);

  const handleSearchBoxChange = useCallback((filter: string) => {
    setFilterText(filter);
    doFetchData(1);
  }, []);

  const handleSearchBoxClear = useCallback(() => {
    setFilterText('');
    doFetchData(1);
  }, []);

  const navTabs = vArtikli.map(item => ({
    key: item,
    text: t(item),
  }));

  const tableColumns = [
    { key: 'intSifra', text: 'intSifra', field: 'intsifra' },
    { key: 'artNaziv', text: 'artNaziv', field: 'artNaziv' },
  ];

  return (
    <FlexColumn>
      <FlexColumnItem>
        <NavTab
          tabs={navTabs}
          selectedTab={vArtikl}
          onItemClick={handleNavTabItemClick}
        />
      </FlexColumnItem>
      <FlexColumnItem>
        <SearchBox
          value={filterText}
          onChange={handleSearchBoxChange}
          onClear={handleSearchBoxClear}
        />
      </FlexColumnItem>
      <FlexColumnItem flex>
        <FetchWrapper fetching={fetching}>
          <Table columns={tableColumns} data={data} />
        </FetchWrapper>
      </FlexColumnItem>
    </FlexColumn>
  );
};

export default DashboardComponent;
