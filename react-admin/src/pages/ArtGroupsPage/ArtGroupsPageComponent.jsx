// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import Tab from '@newtash/core/Tab';
import SearchBox from '@newtash/core/SearchBox';
import { Modal } from '@newtash/core/Modal';
import { Table } from '@newtash/core/Table';
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

const columns = [
  {
    key: 'grpSifra',
    text: '#',
    field: 'grpSifra',
    width: '5%',
    align: 'center',
  },
  { key: 'grpNaziv', text: 'Naziv', field: 'grpNaziv' },
];

export default (props: Props) => {
  const { vArtikl, data, setArtGroupsVArtikl, initForm } = props;

  const [t] = useTranslation('pages');

  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredData = data.filter(item =>
    item.grpNaziv.toLowerCase().includes(search.toLowerCase()),
  );

  const handleTabChange = (key: string) => {
    if (setArtGroupsVArtikl) {
      setArtGroupsVArtikl(key);
    }
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
            columns={columns}
            data={filteredData}
            onRowClick={handleTableRowClick}
          />
          {/* <pre>{JSON.stringify({ vArtikl, data: filteredData }, null, 2)}</pre> */}
        </Card>
      </PageContent>
      <Modal
        isOpen={isFormOpen}
        title="Art Group Title"
        onDismiss={dismissModal}
      >
        <Form onDismiss={dismissModal} />
      </Modal>
    </Page>
  );
};
