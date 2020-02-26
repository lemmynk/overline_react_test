// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import Tab from '@newtash/core/Tab';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import { Table } from '@newtash/core/Table';
import useArtGroupsHook from './useArtGroups';
import { ART_GROUPS_CRUD_URL } from '../../config';

export default () => {
  const hook = useArtGroupsHook(ART_GROUPS_CRUD_URL);
  // console.log('hook:', hook);
  const {
    filteredGroups,
    vArtikli,
    vArtikl,
    search,
    sortedKey,
    sortedAsc,
    setVArtikl,
    setSearch,
    setSortedKey,
    setSortAscending,
  } = hook;

  const [t] = useTranslation(['pages', 'common']);

  const handleAddArtGroup = () => {
    console.log('handleAddArtGroup');
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

  const handleTabChange = (key: string) => {
    if (setVArtikl) {
      setVArtikl(key);
    }
  };

  const renderTabTitle = () => (
    <div style={{ width: '80%' }}>
      <SearchBox compact value={search} onChange={setSearch} />
    </div>
  );

  /*
   |---------------------------------------------------------------
   | TABLE
   |---------------------------------------------------------------
   */

  const columns = () => [
    {
      key: 'grpSifra',
      text: '#',
      field: 'grpSifra',
      width: '5%',
      align: 'center',
      sortable: true,
    },
    {
      key: 'grpNaziv',
      text: t('artGroups.fields.grpNaziv'),
      field: 'grpNaziv',
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
    console.log('table row clicked:', row);
    // if (initForm) {
    //   initForm(row);
    // }
    // setIsFormOpen(true);
  };

  /*
   |---------------------------------------------------------------
   | CALCULATED VALUES
   |---------------------------------------------------------------
   */
  // const filteredGroups = data
  //   .filter(item => item.vArtikl === vArtikl)
  //   .filter(item => item.grpNaziv.toUpperCase().includes(search.toUpperCase()))
  //   .sort(sortByKey(sortedKey, sortedAsc));

  return (
    <Page>
      <PageHeader
        title={t('artGroups.pageTitle')}
        description={t('artGroups.pageDescription')}
        renderButtons={() => (
          <Button
            primary
            compact
            text={t('artGroups.buttons.add')}
            onClick={handleAddArtGroup}
          />
        )}
      />
      <PageContent>
        <Card>
          <Tab
            bottom
            tabs={tabs}
            selectedTab={vArtikl}
            renderTitle={renderTabTitle}
            onChange={handleTabChange}
          />
          <Table
            striped
            hoverable
            columns={columns()}
            data={filteredGroups}
            sortedKey={sortedKey}
            sortedAsc={sortedAsc}
            onRowClick={handleTableRowClick}
            onColumnClick={handleColumnClick}
          />
        </Card>
      </PageContent>
    </Page>
  );
};
