// @flow
import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlexColumn,
  FlexColumnItem,
  NavTab,
  SearchBox,
  Table,
  FetchWrapper,
  ConfirmDialog,
} from '@newtash/react-app-core';
import { TableRowEditDeleteActions } from '../../../../components';
import { vArtikli } from '../../../../config';

type Props = {
  vArtikl: string,
  fetching: string,
  data: ArtGroupDashDataProps,
  filterText: string,
  setVArtikl: string => void,
  setFilterText: string => void,
  fetchData: number => void,
  onEdit: ArtGroupListItemProps => void,
  onDelete: number => void,
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
    onEdit,
    onDelete,
  } = props;

  const [t] = useTranslation('art');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const doFetchData = (page: number) => fetchData(page);

  useEffect(() => {
    doFetchData(1);
  }, []);

  const handleNavTabItemClick = useCallback((item: NavTabItemProps) => {
    setVArtikl(item.key);
    setFilterText('');
  }, []);

  const handleSearchBoxChange = useCallback((filter: string) => {
    setFilterText(filter);
  }, []);

  const handleSearchBoxClear = useCallback(() => {
    setFilterText('');
  }, []);

  const handleEditButtonClick = (item: ArtGroupListItemProps) => () => {
    if (onEdit) {
      onEdit(item);
    }
  };

  const handleDeleteButtonClick = (id: number) => () => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDeleteClick = useCallback(() => {
    setIsConfirmOpen(false);
    if (onDelete) {
      onDelete(deleteId);
    }
  }, [deleteId]);

  const navTabs = vArtikli.map(item => ({
    key: item,
    text: t(item),
  }));

  const tableData =
    data && data[vArtikl]
      ? data[vArtikl].filter(item =>
          item.grpNaziv.toLowerCase().includes(filterText.toLowerCase()),
        )
      : [];

  const tableColumns = [
    { key: 'grpSifra', text: 'grpSifra', field: 'grpSifra' },
    { key: 'grpNaziv', text: 'grpNaziv', field: 'grpNaziv' },
    {
      key: 'id',
      text: '',
      onRenderItem: (item: ArtGroupListItemProps) => (
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
    <>
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
            <Table striped columns={tableColumns} data={tableData} />
          </FetchWrapper>
        </FlexColumnItem>
      </FlexColumn>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onDismiss={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDeleteClick}
      />
    </>
  );
};

export default DashboardComponent;
