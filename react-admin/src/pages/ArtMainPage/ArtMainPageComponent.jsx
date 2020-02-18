// @flow
import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import Tab from '@newtash/core/Tab';
import Select from '@newtash/core/Select';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import { Table } from '@newtash/core/Table';
import Pagination from '@newtash/core/Pagination';
import { vArtikliTabs } from '../../config';
import styles from './ArtMainPage.module.scss';

type Props = {
  isFetching: boolean,
  vArtikl: string,
  data: Array<Object>,
  pagination: PaginationProps,
  grpOptions: Array<KeyTextObject>,
  clearArtMainData: () => void,
  setArtMainVArtikl: string => void,
  fetchArtMain: Object => void,
  initForm: Data => void,
};

const ArtMainPage = (props: Props) => {
  const {
    isFetching,
    vArtikl,
    data,
    pagination,
    grpOptions,
    clearArtMainData,
    setArtMainVArtikl,
    fetchArtMain,
    initForm,
  } = props;

  const history = useHistory();
  const match = useRouteMatch();
  const { t } = useTranslation('pages');
  const [grpId, setGrpId] = useState('');
  const [search, setSearch] = useState('');
  const [sortedKey, setSortedKey] = useState('artNaziv');
  const [sortedAsc, setSortAscending] = useState(true);

  const doFetchArtMains = useCallback(
    (page: number = 1) => {
      const orderBy = sortedAsc ? sortedKey : `${sortedKey} DESC`;
      const payload = {
        vArtikl,
        grpId,
        s: search,
        orderBy,
        page,
      };
      if (fetchArtMain) {
        fetchArtMain(payload);
      }
    },
    [fetchArtMain, vArtikl, grpId, search, sortedKey, sortedAsc],
  );

  useEffect(() => {
    doFetchArtMains();
  }, [doFetchArtMains]);

  useEffect(() => {
    if (clearArtMainData) {
      clearArtMainData();
    }
  }, [clearArtMainData]);

  const columns = () => [
    {
      key: 'intSifra',
      text: t('artMain.fields.intSifra'),
      field: 'intSifra',
      sortable: true,
    },
    {
      key: 'artNaziv',
      text: t('artMain.fields.artNaziv'),
      field: 'artNaziv',
      sortable: true,
    },
    {
      key: 'grpNaziv',
      text: t('artMain.fields.grpNaziv'),
      field: 'grpNaziv',
      sortable: false,
    },
    {
      key: 'mera',
      text: t('artMain.fields.mera'),
      field: 'mera',
      sortable: false,
    },
    {
      key: 'pdvStopa',
      text: t('artMain.fields.pdvStopa'),
      field: 'pdvStopa',
      sortable: false,
      align: 'center',
      onRenderItem: item => item.pdvStopa / 100,
    },
  ];

  const handleTabChange = (key: string) => {
    if (setArtMainVArtikl) {
      setArtMainVArtikl(key);
    }
  };

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

  const handleAddButtonClick = () => {
    const row = {
      vArtikl,
      grpId,
    };

    if (initForm) {
      initForm(row);
    }
    history.push(`${match.url}/create`);
  };

  const handlePagingClick = (page: number) => {
    doFetchArtMains(page);
  };

  const renderDescription = (desc: PaginationDescriptionProps) => {
    return <div>{t('artMain.listPagination', desc)}</div>;
  };

  const translatedGrpOptions = grpOptions.map(item =>
    item.key === '' ? { ...item, text: t(item.text) } : item,
  );

  return (
    <Page>
      <PageHeader
        title={t('artMain.pageTitle')}
        description={t('artMain.pageDescription')}
        renderButtons={() => (
          <Button
            primary
            compact
            text={t('artMain.buttons.add')}
            onClick={handleAddButtonClick}
          />
        )}
      />
      <PageContent>
        <Card>
          <Tab
            bottom
            tabs={vArtikliTabs}
            selectedTab={vArtikl}
            onChange={handleTabChange}
          />
          <div className={styles.searchRow}>
            <div className={styles.column}>
              <Select
                value={grpId}
                options={translatedGrpOptions}
                onChange={val => setGrpId(val)}
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

export default ArtMainPage;
