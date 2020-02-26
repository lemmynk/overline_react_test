// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import Tab from '@newtash/core/Tab';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import { Table, TableButton } from '@newtash/core/Table';
import Confirm from '@newtash/core/Confirm';
import { rand } from '@newtash/core/utils';
import useArtGroupsHook from './useArtGroups';
import Form from '../../forms/ArtGroupForm';
import { ART_GROUPS_CRUD_URL } from '../../config';

export default () => {
  const [t] = useTranslation(['pages', 'common']);
  const hook = useArtGroupsHook(
    ART_GROUPS_CRUD_URL,
    t('artGroups.errors.delete-error'),
  );
  const {
    filteredGroups,
    vArtikli,
    vArtikl,
    search,
    sortedKey,
    sortedAsc,
    formId,
    setVArtikl,
    setSearch,
    setSortedKey,
    setSortAscending,
    setFormId,
    fetchData,
    deleteItem,
  } = hook;

  const [isFormOpen, setFormOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

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
        fetchData();
      }
    });
  };

  const handleGroupSaved = () => {
    fetchData();
    setFormOpen(false);
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
      <Form
        isOpen={isFormOpen}
        itemId={formId}
        vArtikl={vArtikl}
        onDismiss={() => setFormOpen(false)}
        onSuccess={handleGroupSaved}
      />
      <Confirm
        isOpen={isConfirmOpen}
        title={t('common:areYouSure')}
        textConfirm={t('common:Yes')}
        textCancel={t('common:No')}
        onConfirm={handleDeleteConfirmationClick}
        onDismiss={() => setConfirmOpen(false)}
      >
        {t('artGroups.deleteConfirmation')
          .split('|')
          .map(str => (
            <p key={rand()}>{str}</p>
          ))}
      </Confirm>
    </Page>
  );
};
