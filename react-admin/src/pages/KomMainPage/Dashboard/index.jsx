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
import useKomMain from './useKomMain';
import styles from '../../Page.module.scss';

export default () => {
  const { t } = useTranslation(['komPages', 'common']);
  const history = useHistory();
  const match = useRouteMatch();
  const {
    vKoms,
    vKom,
    setVKom,
    data,
    pagination,
    isFetching,
    komMestaSelectOptions,
    filterMesto,
    search,
    sortedKey,
    sortedAsc,
    setFilterMesto,
    setSearch,
    setSortedKey,
    setSortAscending,
    fetchKomMains,
  } = useKomMain();

  const handleAddButtonClick = () => {
    const q = { vKom, mestoId: filterMesto };
    const query = Object.keys(q)
      .filter(key => q[key])
      .reduce((acc, key: string) => ({ ...acc, [key]: q[key] }), {});
    const queryStr = qs.stringify(query);
    history.push(`${match.url}/create?${queryStr}`);
  };

  /*
   |---------------------------------------------------------------
   | TAB
   |---------------------------------------------------------------
   */
  const tabs = () => {
    const komTabs = [];
    if (vKoms.includes(1)) {
      komTabs.push({ key: '1', title: t(`common:vKom.p1`) });
      komTabs.push({ key: '2', title: t(`common:vKom.p2`) });
      komTabs.push({ key: '4', title: t(`common:vKom.p4`) });
    }
    if (vKoms.includes(8)) {
      komTabs.push({ key: '8', title: t(`common:vKom.p8`) });
    }
    return komTabs;
  };

  /*
   |---------------------------------------------------------------
   | TABLE
   |---------------------------------------------------------------
   */
  const columns = () => [
    {
      key: 'sifra',
      text: t('komMain.fields.sifra'),
      field: 'sifra',
      sortable: true,
    },
    {
      key: 'intNaziv',
      text: t('komMain.fields.intNaziv'),
      field: 'intNaziv',
      sortable: true,
    },
    {
      key: 'naziv',
      text: t('komMain.fields.naziv'),
      field: 'naziv',
      sortable: true,
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
    history.push(`${match.url}/edit/${id}`);
  };

  /*
   |---------------------------------------------------------------
   | PAGINATION
   |---------------------------------------------------------------
   */

  const handlePagingClick = (page: number) => {
    fetchKomMains(page);
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
  const mestaOptions = [
    { key: '', text: t(`komMain.mestaOptions.placeholder`) },
    ...komMestaSelectOptions,
  ];

  return (
    <Page>
      <PageHeader
        title={t('komMain.pageTitle')}
        description={t('komMain.pageDescription')}
        renderButtons={() => (
          <Button
            primary
            compact
            text={t('komMain.buttons.add')}
            onClick={handleAddButtonClick}
          />
        )}
      />
      <PageContent>
        <Card>
          <Tab bottom tabs={tabs()} selectedTab={vKom} onChange={setVKom} />
          <div className={styles.searchRow}>
            <div className={styles.column}>
              <Select
                value={filterMesto}
                options={mestaOptions}
                onChange={setFilterMesto}
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
