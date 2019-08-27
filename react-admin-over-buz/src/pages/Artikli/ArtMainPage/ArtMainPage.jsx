// @flow
import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Page, PageHeader, PageContent, Button } from '@newtash/react-app-core';
import Dashboard from './Dashboard';

// type Props = {
// };

const ArtMainPage = () => {
  // const [t] = useTranslation(['art', 'common']);

  const handleCreateButtonClick = (item: ArtMainFormDataProps) => {
    // eslint-disable-next-line no-console
    console.log('...create:', item);
  };

  const handleEditButtonClick = (item: ArtMainFormDataProps) => () => {
    // eslint-disable-next-line no-console
    console.log('...edit:', item);
  };

  const handleDeleteButtonClick = (id: number) => () => {
    // eslint-disable-next-line no-console
    console.log('...delete:', id);
  };

  return (
    <>
      <Dashboard
        onCreate={handleCreateButtonClick}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteButtonClick}
      />
    </>
  );
};

export default ArtMainPage;
