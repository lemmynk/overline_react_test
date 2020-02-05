// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import WhoopsPage from './WhoopsPage';

const Whoops403Component = () => {
  const [t] = useTranslation('common');

  return <WhoopsPage errorCode={403} description={t('whoops.403')} />;
};

export default Whoops403Component;
