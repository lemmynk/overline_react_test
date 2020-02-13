// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import Tab from '@newtash/core/Tab';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import { Modal } from '@newtash/core/Modal';
import { Table } from '@newtash/core/Table';
import { sortByKey } from '@newtash/core/utils';
import Form from '../../forms/ArtGroupsForm';
import styles from './ArtGroupsPage.module.scss';

type Props = {
  vArtikl: string,
  data: Array<Object>,
  setArtGroupsVArtikl: string => void,
  initForm: Object => void,
};

const tabs = [
  { key: 'roba', title: 'Roba' },
  { key: 'usluga', title: 'Usluga' },
];

export default (props: Props) => {
  const { vArtikl, data, setArtGroupsVArtikl, initForm } = props;

  const [t] = useTranslation('pages');

  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortedKey, setSortedKey] = useState('grpNaziv');
  const [sortedAsc, setSortAscending] = useState(true);

  const columns = () => [
    {
      key: 'grpSifra',
      text: '#',
      field: 'grpSifra',
      width: '5%',
      align: 'center',
      sortable: true,
    },
    { key: 'grpNaziv', text: 'Naziv', field: 'grpNaziv', sortable: true },
    {
      key: 'id',
      text: '',
      field: 'id',
      onRenderItem: () => (
        <span>
          <s>X</s>
        </span>
      ),
      // onRenderItem: () => (
      //   <Button small compact>
      //     <FontAwesomeIcon icon="minus-square" />
      //   </Button>
      // ),
      width: '36px',
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

  const filteredData = data
    .filter(item => item.grpNaziv.toLowerCase().includes(search.toLowerCase()))
    .sort(sortByKey(sortedKey, sortedAsc));

  const handleTabChange = (key: string) => {
    if (setArtGroupsVArtikl) {
      setArtGroupsVArtikl(key);
    }
  };

  const handleAddArtGroup = () => {
    if (initForm) {
      initForm({
        vArtikl,
      });
    }
    setIsFormOpen(true);
  };

  const renderTabTitle = () => (
    <div className={styles.titleArea}>
      <SearchBox compact value={search} onChange={setSearch} />
    </div>
  );

  const handleTableRowClick = (row: Data) => {
    // console.log('table row clicked:', row);
    if (initForm) {
      initForm(row);
    }
    setIsFormOpen(true);
  };

  const dismissModal = () => {
    setIsFormOpen(false);
  };

  return (
    <Page>
      <PageHeader
        title={t('artGroups.title')}
        description={t('artGroups.description')}
        renderButtons={() => (
          <Button primary compact text="Add" onClick={handleAddArtGroup} />
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
            data={filteredData}
            sortedKey={sortedKey}
            sortedAsc={sortedAsc}
            onRowClick={handleTableRowClick}
            onColumnClick={handleColumnClick}
          />
          {/* <pre>{JSON.stringify({ vArtikl, data: filteredData }, null, 2)}</pre> */}
        </Card>
      </PageContent>
      <Modal isOpen={isFormOpen} onDismiss={dismissModal}>
        <Form onDismiss={dismissModal} />
      </Modal>
    </Page>
  );
};
