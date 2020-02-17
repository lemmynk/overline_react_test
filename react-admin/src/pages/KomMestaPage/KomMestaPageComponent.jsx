// @flow
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import { Table, TableButton } from '@newtash/core/Table';
import { sortByKey } from '@newtash/core/utils';

type Props = {
  data: Array<Data>,
  fetchKomMesta: () => void,
};

export default (props: Props) => {
  const { data, fetchKomMesta } = props;

  const { t } = useTranslation('pages');
  const [search, setSearch] = useState('');
  const [sortedKey, setSortedKey] = useState('naziv');
  const [sortedAsc, setSortAscending] = useState(true);

  useEffect(() => {
    if (fetchKomMesta) {
      fetchKomMesta();
    }
  }, [fetchKomMesta]);

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
      onRenderItem: item => (
        <TableButton
          danger
          icon="minus-square"
          onClick={() => {
            console.log('...delete:', item.id);
            // setDeleteId(item.id);
            // setConfirmOpen(true);
          }}
        />
      ),
      width: '2rem',
    },
  ];

  const filteredData = data
    .filter(
      item =>
        item.zip.toLowerCase().includes(search.toLowerCase()) ||
        item.naziv.toLowerCase().includes(search.toLowerCase()) ||
        item.opstina.toLowerCase().includes(search.toLowerCase()),
    )
    .sort(sortByKey(sortedKey, sortedAsc));

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

  const handleAddArtMesto = () => {
    console.log('add new');
  };

  return (
    <Page>
      <PageHeader
        title={t('komMesta.pageTitle')}
        description={t('komMesta.pageDescritpion')}
        renderButtons={() => (
          <Button
            primary
            compact
            text={t('komMesta.buttons.add')}
            onClick={handleAddArtMesto}
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
            data={filteredData}
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
