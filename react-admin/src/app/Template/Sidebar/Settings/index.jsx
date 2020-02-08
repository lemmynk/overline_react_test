// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '@newtash/core/Icon';
import styles from './Settings.module.scss';

export default () => {
  const [t] = useTranslation('nav');
  return (
    <div className={styles.navLink}>
      <Link to="/settings" title={t('Settings')} tabIndex={-1}>
        <div className={styles.iconArea}>
          <Icon icon="cog" />
        </div>
      </Link>
    </div>
  );
};
