// @flow
import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Page,
  PageHeader,
  PageContent,
  Button,
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
  defaultPdv: ArtPdvProps,
  getConfigValue: string => any,
  setVArtikl: string => void,
  setFilterText: string => void,
  setFilterSelect: string => void,
  fetchData: number => void,
  onCreate: ArtMainFormDataProps => void,
  onEdit: ArtMainFormDataProps => () => void,
  onDelete: number => () => void,
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
    getConfigValue,
    defaultPdv,
    setVArtikl,
    setFilterText,
    setFilterSelect,
    fetchData,
    onCreate,
    onEdit,
    onDelete,
  } = props;

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
          onEditClick={onEdit(item)}
          onDeleteClick={onDelete(item.id)}
        />
      ),
      width: '6em',
      align: 'center',
    },
  ];

  const handleCreateButtonClick = () => {
    const mera = getConfigValue('ART_FORM_DEFAULT_MERA');
    const pdvId = defaultPdv.id;

    const formData = {
      vArtikl,
      grpId: parseInt(filterSelect, 10),
      mera,
      pdvId,
    };
    if (onCreate) {
      onCreate(formData);
    }
  };

  const renderHeaderButtons = useCallback(
    () => (
      <Button
        primary
        text={t('artMain.createButtonTitle')}
        // eslint-disable-next-line no-console
        onClick={handleCreateButtonClick}
      />
    ),
    [vArtikl, filterSelect],
  );

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
    </Page>
  );
};

export default DashboardComponent;
