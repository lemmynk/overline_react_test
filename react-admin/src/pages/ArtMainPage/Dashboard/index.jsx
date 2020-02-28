// @flow
import React from 'react';
// import { useRouteMatch, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Page, PageHeader, PageContent } from '@newtash/core/Page';
import Card from '@newtash/core/Card';
import Tab from '@newtash/core/Tab';
import SearchBox from '@newtash/core/SearchBox';
import Button from '@newtash/core/Button';
import Select from '@newtash/core/Select';
import useArtMain from './useArtMain';
import { ART_MAIN_CRUD_URL } from '../../../config';
import styles from '../ArtMainPage.module.scss';

export default () => {
  const { t } = useTranslation('pages');
  const hook = useArtMain(ART_MAIN_CRUD_URL);
  const {
    isFetching,
    vArtikli,
    vArtikl,
    artGroupsSelectOptions,
    filterGroup,
    search,
    setVArtikl,
    setFilterGroup,
    setSearch,
  } = hook;

  const handleAddButtonClick = () => {
    console.log('...add...');
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

  /*
   |---------------------------------------------------------------
   | CALCULATED VALUES
   |---------------------------------------------------------------
   */

  /**
   * Add Select All element
   */
  const groupsOptions = [
    { key: '', text: t(`artMain.grpOptions.${vArtikl}`) },
    ...artGroupsSelectOptions,
  ];

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
            tabs={tabs}
            selectedTab={vArtikl}
            onChange={handleTabChange}
          />
          <div className={styles.searchRow}>
            <div className={styles.column}>
              <Select
                value={filterGroup}
                options={groupsOptions}
                onChange={setFilterGroup}
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
        </Card>
      </PageContent>
    </Page>
  );
};
