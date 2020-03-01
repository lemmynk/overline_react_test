// @flow
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import { Table, TableButton } from '@newtash/core/Table';
import Confirm from '@newtash/core/Confirm';
import { rand } from '@newtash/core/utils';
import useKomMestaHook from './useKomMesta';
import Form from '../../forms/KomMestaForm';
import { KOM_MESTA_CRUD_URL } from '../../config';

export default () => {
  const [t] = useTranslation(['pages', 'common']);
  const hook = useKomMestaHook(
    KOM_MESTA_CRUD_URL,
    t('komMesta.errors.delete-error'),
  );
  const {
    filteredMesta,
    search,
    sortedKey,
    sortedAsc,
    formId,
    setSearch,
    setSortedKey,
    setSortAscending,
    setFormId,
    doFetch,
    deleteItem,
  } = hook;

  const [isFormOpen, setFormOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

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
            setFormId(item.id);
            setConfirmOpen(true);
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
   | CONFIRM DELETE
   |---------------------------------------------------------------
   */
  const handleDeleteConfirmationClick = () => {
    setConfirmOpen(false);
    deleteItem(formId).then(success => {
      if (success) {
        doFetch();
      }
    });
  };

  const handleMestoSaved = () => {
    doFetch();
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
            data={filteredMesta}
            sortedKey={sortedKey}
            sortedAsc={sortedAsc}
            onRowClick={handleTableRowClick}
            onColumnClick={handleColumnClick}
          />
        </Card>
      </PageContent>
      <Form
        isOpen={isFormOpen}
        itemId={formId}
        onDismiss={() => setFormOpen(false)}
        onSuccess={handleMestoSaved}
      />
      <Confirm
        isOpen={isConfirmOpen}
        title={t('common:areYouSure')}
        textConfirm={t('common:Yes')}
        textCancel={t('common:No')}
        onConfirm={handleDeleteConfirmationClick}
        onDismiss={() => setConfirmOpen(false)}
      >
        {t('komMesta.deleteConfirmation')
          .split('|')
          .map(str => (
            <p key={rand()}>{str}</p>
          ))}
      </Confirm>
    </Page>
  );
};
