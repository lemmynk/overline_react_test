// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import { Table, TableButton } from '@newtash/core/Table';
import Pagination from '@newtash/core/Pagination';
import useKomMestaHook from './useKomMesta';
import Form from '../../forms/KomMestaForm';

export default () => {
  const [t] = useTranslation(['komPages', 'common']);

  const {
    isFetching,
    data,
    pagination,
    search,
    sortedKey,
    sortedAsc,
    setSearch,
    setSortedKey,
    setSortAscending,
    fetchKomMesta,
    formId,
    setFormId,
    deleteItem,
  } = useKomMestaHook();

  const [isFormOpen, setFormOpen] = useState(false);

  const handleAddArtGroup = () => {
    setFormId(0);
    setFormOpen(true);
  };

  /*
   |---------------------------------------------------------------
   | TABLE
   |---------------------------------------------------------------
   */

  const columns = () => [
    {
      key: 'zip',
      text: t('komMesta.fields.zip'),
      field: 'zip',
      width: '5%',
      align: 'center',
      sortable: true,
    },
    {
      key: 'naziv',
      text: t('komMesta.fields.naziv'),
      field: 'naziv',
      sortable: true,
    },
    {
      key: 'opstina',
      text: t('komMesta.fields.opstina'),
      field: 'opstina',
      sortable: true,
    },
    {
      key: 'id',
      text: '',
      field: 'id',
      onRenderItem: (item: Object) => (
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
    fetchKomMesta(page);
  };

  const renderDescription = (desc: PaginationDescriptionProps) => {
    return <div>{t('komMesta.listPagination', desc)}</div>;
  };

  const handleMestoSaved = () => {
    fetchKomMesta();
    setFormOpen(false);
  };

  return (
    <Page>
      <PageHeader
        title={t('komMesta.pageTitle')}
        description={t('komMesta.pageDescription')}
        renderButtons={() => (
          <Button
            primary
            compact
            text={t('komMesta.buttons.add')}
            onClick={handleAddArtGroup}
          />
        )}
      />
      <PageContent>
        <Card>
          <SearchBox compact value={search} onChange={setSearch} />
        </Card>
        <Card>
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
        onDismiss={() => setFormOpen(false)}
        onSuccess={handleMestoSaved}
      />
    </Page>
  );
};
