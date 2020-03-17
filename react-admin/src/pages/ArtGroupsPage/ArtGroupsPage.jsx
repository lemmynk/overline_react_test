// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import Tab from '@newtash/core/Tab';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import { Table, TableButton } from '@newtash/core/Table';
import Pagination from '@newtash/core/Pagination';
import useArtGroupsHook from './useArtGroups';
import Form from '../../forms/ArtGroupForm';

export default () => {
  const [t] = useTranslation(['pages', 'common']);
  const hook = useArtGroupsHook();
  const {
    isFetching,
    vArtikli,
    vArtikl,
    search,
    sortedKey,
    sortedAsc,
    data,
    pagination,
    formId,
    setVArtikl,
    setSearch,
    setSortedKey,
    setSortAscending,
    setFormId,
    fetchArtGroups,
    deleteItem,
  } = hook;

  const [isFormOpen, setFormOpen] = useState(false);

  const handleAddArtGroup = () => {
    setFormId(0);
    setFormOpen(true);
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
    {
      key: 'id',
      text: '',
      field: 'id',
      onRenderItem: item => (
        <TableButton
          danger
          icon="minus-square"
          onClick={() => {
            deleteItem(item.id);
          }}
        />
      ),
      width: '2rem',
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
    setFormId(row.id);
    setFormOpen(true);
  };

  /*
   |---------------------------------------------------------------
   | PAGINATION
   |---------------------------------------------------------------
   */
  const handlePagingClick = (page: number) => {
    fetchArtGroups(page);
  };

  const renderDescription = (desc: PaginationDescriptionProps) => {
    return <div>{t('komMesta.listPagination', desc)}</div>;
  };

  /*
   |---------------------------------------------------------------
   | CRUD
   |---------------------------------------------------------------
   */
  const handleGroupSaved = () => {
    fetchArtGroups();
    setFormOpen(false);
  };

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
      <Form
        isOpen={isFormOpen}
        itemId={formId}
        vArtikl={vArtikl}
        onDismiss={() => setFormOpen(false)}
        onSuccess={handleGroupSaved}
      />
    </Page>
  );
};
