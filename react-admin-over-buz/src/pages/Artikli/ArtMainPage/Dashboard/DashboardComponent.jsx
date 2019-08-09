// @flow
import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlexColumn,
  FlexColumnItem,
  NavTab,
  Table,
  Pagination,
  FetchWrapper,
} from '@newtash/react-app-core';
import {
  SelectSearchFilterBar,
  TableRowEditDeleteActions,
} from '../../../../components';
import { vArtikli } from '../../../../config';

type Props = {
  vArtikl: string,
  fetching: string,
  data: Array<ArtMainListItemProps>,
  paging: PagingProps,
  filterText: string,
  filterSelect: string,
  artGroups: ArtGroupDashDataProps,
  setVArtikl: string => void,
  setFilterText: string => void,
  setFilterSelect: string => void,
  fetchData: number => void,
};

const DashboardComponent = (props: Props) => {
  const {
    vArtikl,
    fetching,
    data,
    paging,
    filterText,
    filterSelect,
    artGroups,
    setVArtikl,
    setFilterText,
    setFilterSelect,
    fetchData,
  } = props;

  const [t] = useTranslation('art');
  const [tCommon] = useTranslation('common');

  const doFetchData = (page: number) => fetchData(page);

  useEffect(() => {
    doFetchData(1);
  }, []);

  const handleNavTabItemClick = useCallback((item: NavTabItemProps) => {
    setVArtikl(item.key);
    setFilterText('');
    setFilterSelect('');
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

  const handleFilterSelectChange = useCallback((selectedKey: string) => {
    setFilterSelect(selectedKey);
    doFetchData(1);
  }, []);

  const handlePaginationClick = useCallback((page: number) => {
    doFetchData(page);
  }, []);

  const handleEditButtonClick = (item: ArtMainListItemProps) => () => {
    // eslint-disable-next-line no-console
    console.log('...edit:', item);
  };

  const handleDeleteButtonClick = (id: number) => () => {
    // eslint-disable-next-line no-console
    console.log('...delete:', id);
  };

  const renderDescription = (item: PaginationDescriptionProps) =>
    tCommon('dashPagingDescription', item);

  const navTabs = vArtikli.map(item => ({
    key: item,
    text: t(item),
  }));

  const selectOptions = artGroups[vArtikl] || [];

  const tableColumns = [
    { key: 'intSifra', text: t('intSifra'), field: 'intSifra', width: '6em' },
    { key: 'artNaziv', text: t('artNaziv'), field: 'artNaziv' },
    {
      key: 'id',
      text: '',
      onRenderItem: (item: ArtMainListItemProps) => (
        <TableRowEditDeleteActions
          onEditClick={handleEditButtonClick(item)}
          onDeleteClick={handleDeleteButtonClick(item.id)}
        />
      ),
      width: '6em',
      align: 'center',
    },
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
        <SelectSearchFilterBar
          labelSelect="labelSelect"
          labelText="labelText"
          selectOptions={selectOptions}
          filterSelect={filterSelect}
          setSelectFilter={handleFilterSelectChange}
          filterText={filterText}
          setFilterText={handleSearchBoxChange}
          clearFilterText={handleSearchBoxClear}
        />
      </FlexColumnItem>
      <FlexColumnItem>
        <Pagination
          paging={paging}
          fetching={fetching}
          onClick={handlePaginationClick}
          renderDescription={renderDescription}
        />
      </FlexColumnItem>
      <FlexColumnItem flex scroll>
        <FetchWrapper fetching={fetching}>
          <Table striped columns={tableColumns} data={data} />
        </FetchWrapper>
      </FlexColumnItem>
    </FlexColumn>
  );
};

export default DashboardComponent;
