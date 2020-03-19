// @flow
import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import qs from 'qs';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import Tab from '@newtash/core/Tab';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import Select from '@newtash/core/Select';
import { Table } from '@newtash/core/Table';
import Pagination from '@newtash/core/Pagination';
import useArtMain from './useArtMain';
import styles from '../../Page.module.scss';

export default () => {
  const { t } = useTranslation('pages');
  const history = useHistory();
  const { url: baseUrl } = useRouteMatch();
  const hook = useArtMain();
  const {
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
  } = hook;

  const handleAddButtonClick = () => {
    const q = { vArtikl, grpId: filterGroup };
    const query = Object.keys(q)
      .filter(key => q[key])
      .reduce((acc, key: string) => ({ ...acc, [key]: q[key] }), {});
    const queryStr = qs.stringify(query);
    history.push(`${baseUrl}/create?${queryStr}`);
  };

  /*
   |---------------------------------------------------------------
   | TAB
   |---------------------------------------------------------------
   */
  const tabs = vArtikli.map(item => ({
    key: item,
    title: t(`common:vArtikl.${item}`),
  }));

  const handleTabChange = (newValue: string) => {
    setFilterGroup('');
    setVArtikl(newValue);
  };

  /*
   |---------------------------------------------------------------
   | TABLE
   |---------------------------------------------------------------
   */

  const columns = () => [
    {
      key: 'intSifra',
      text: t('artMain.fields.intSifra'),
      field: 'intSifra',
      sortable: true,
    },
    {
      key: 'artNaziv',
      text: t('artMain.fields.artNaziv'),
      field: 'artNaziv',
      sortable: true,
    },
    {
      key: 'grpNaziv',
      text: t('artMain.fields.grpNaziv'),
      field: 'grpNaziv',
      sortable: false,
    },
    {
      key: 'mera',
      text: t('artMain.fields.mera'),
      field: 'mera',
      sortable: false,
    },
    {
      key: 'pdvStopa',
      text: t('artMain.fields.pdvStopa'),
      field: 'pdvStopa',
      sortable: false,
      align: 'center',
      onRenderItem: item => item.pdvStopa / 100,
    },
  ];

  const handleColumnClick = (column: TableColumnProps) => {
    const { key } = column;
    if (key !== sortedKey) {
      setSortedKey(key);
      setSortAscending(true);
    } else {
      setSortAscending(!sortedAsc);
    }
  };

  const handleTableRowClick = (row: Data) => {
    const { id } = row;
    history.push(`${baseUrl}/edit/${id}`);
  };

  /*
   |---------------------------------------------------------------
   | PAGINATION
   |---------------------------------------------------------------
   */

  const handlePagingClick = (page: number) => {
    fetchArtMains(page);
  };

  const renderDescription = (desc: PaginationDescriptionProps) => {
    return <div>{t('artMain.listPagination', desc)}</div>;
  };

  /*
   |---------------------------------------------------------------
   | CALCULATED VALUES
   |---------------------------------------------------------------
   */

  /**
   * Add Select All element
   */
  const groupsOptions = [
    { key: '', text: t(`artMain.grpOptions.${vArtikl}`) },
    ...artGroupsSelectOptions,
  ];

  return (
    <Page>
      <PageHeader
        title={t('artMain.pageTitle')}
        description={t('artMain.pageDescription')}
        renderButtons={() => (
          <Button
            primary
            compact
            text={t('artMain.buttons.add')}
            onClick={handleAddButtonClick}
          />
        )}
      />
      <PageContent>
        <Card>
          <Tab
            bottom
            tabs={tabs}
            selectedTab={vArtikl}
            onChange={handleTabChange}
          />
          <div className={styles.searchRow}>
            <div className={styles.column}>
              <Select
                value={filterGroup}
                options={groupsOptions}
                onChange={setFilterGroup}
              />
            </div>
            <div className={styles.column}>
              <SearchBox
                compact
                value={search}
                fetching={isFetching}
                onChange={setSearch}
              />
            </div>
          </div>
          <Table
            striped
            hoverable
            columns={columns()}
            data={data}
            sortedKey={sortedKey}
            sortedAsc={sortedAsc}
            onRowClick={handleTableRowClick}
            onColumnClick={handleColumnClick}
          />
          <Pagination
            fetching={isFetching}
            paging={pagination}
            onClick={handlePagingClick}
            renderDescription={renderDescription}
          />
        </Card>
      </PageContent>
    </Page>
  );
};
