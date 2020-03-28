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
import useMagMainsHook from './useMagMains';
import Form from '../../forms/MagMainForm';

export default () => {
  const [t] = useTranslation(['pages', 'common']);
  const hook = useMagMainsHook();
  const {
    isFetching,
    vPromets,
    vPromet,
    search,
    sortedKey,
    sortedAsc,
    data,
    pagination,
    formId,
    setVPromet,
    setSearch,
    setSortedKey,
    setSortAscending,
    setFormId,
    fetchMagMains,
    deleteItem,
  } = hook;

  const [isFormOpen, setFormOpen] = useState(false);

  const handleAddMagMain = () => {
    setFormId(0);
    setFormOpen(true);
  };

  /*
   |---------------------------------------------------------------
   | TAB
   |---------------------------------------------------------------
   */
  const tabs = vPromets.map(item => ({
    key: item,
    title: t(`common:vPromet.${item}`),
  }));

  const handleTabChange = (key: string) => {
    if (setVPromet) {
      setVPromet(key);
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
      key: 'sifra',
      text: t('magMains.fields.sifra'),
      field: 'sifra',
      width: '10%',
      align: 'center',
      sortable: true,
    },
    {
      key: 'magNaziv',
      text: t('magMains.fields.magNaziv'),
      field: 'magNaziv',
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
    fetchMagMains(page);
  };

  const renderDescription = (desc: PaginationDescriptionProps) => {
    return <div>{t('komMesta.listPagination', desc)}</div>;
  };

  /*
   |---------------------------------------------------------------
   | CRUD
   |---------------------------------------------------------------
   */
  const handleMagSaved = () => {
    fetchMagMains();
    setFormOpen(false);
  };

  return (
    <Page>
      <PageHeader
        title={t('magMains.pageTitle')}
        description={t('magMains.pageDescription')}
        renderButtons={() => (
          <Button
            primary
            compact
            text={t('magMains.buttons.add')}
            onClick={handleAddMagMain}
          />
        )}
      />
      <PageContent>
        <Card>
          <Tab
            bottom
            tabs={tabs}
            selectedTab={vPromet}
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
        vPromet={vPromet}
        onDismiss={() => setFormOpen(false)}
        onSuccess={handleMagSaved}
      />
    </Page>
  );
};
