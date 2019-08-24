// @flow
import React, { useEffect, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Page,
  PageHeader,
  PageContent,
  Link,
  FlexColumn,
  FlexColumnItem,
  NavTab,
  Table,
  Pagination,
  FetchWrapper,
  ConfirmDialog,
} from '@newtash/react-app-core';
import {
  SelectSearchFilterBar,
  TableRowEditDeleteActions,
} from '../../../../components';
import { vArtikli, CRUD_URL_CREATE, CRUD_URL_EDIT } from '../../../../config';

type Props = {
  history: ReactRouterHistory,
  basePath: string,
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
  doDelete: number => void,
};

const DashboardComponent = (props: Props) => {
  const {
    history,
    basePath,
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
    doDelete,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const [t] = useTranslation(['art', 'common']);

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
    history.push(`${basePath}/${CRUD_URL_EDIT}/${item.id}`);
  };

  const handleDeleteButtonClick = (id: number) => () => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const handleDeleteConfirm = useCallback(() => {
    setIsOpen(false);
    if (doDelete) {
      doDelete(deleteId);
    }
  }, [deleteId]);

  const renderDescription = (item: PaginationDescriptionProps) =>
    t('common:dashPagingDescription', item);

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

  const renderHeaderButtons = useCallback(() => {
    const parts = [`${basePath}/${CRUD_URL_CREATE}/${vArtikl}`];
    if (filterSelect && parseInt(filterSelect, 10) > 0) {
      parts.push(filterSelect);
    }
    return (
      <Link to={parts.join('/')} primary>
        {t('artMain.createButtonTitle')}
      </Link>
    );
  }, [vArtikl, filterSelect]);

  return (
    <Page>
      <PageHeader
        title={t('artMain.dahboardTitle')}
        renderButtons={renderHeaderButtons}
      />
      <PageContent>
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
              labelSelect={t('artMain.dashboardSelectGroups')}
              labelText={t('artMain.dashboardTextPlaceholder')}
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
      </PageContent>
      <ConfirmDialog
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Page>
  );
};

export default withRouter(DashboardComponent);
