// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import WhoopsPage from './WhoopsPage';

const Whoops404Component = () => {
  const [t] = useTranslation('common');

  return <WhoopsPage errorCode={404} description={t('whoops.404')} />;
};

export default Whoops404Component;
