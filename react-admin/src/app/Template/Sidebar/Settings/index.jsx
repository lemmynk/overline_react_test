// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@newtash/core/Icon';
import styles from './Settings.module.scss';

export default () => (
  <div className={styles.navLink}>
    <Link to="/settings" title="settings" tabIndex={-1}>
      <div className={styles.iconArea}>
        <Icon icon="cog" />
      </div>
    </Link>
  </div>
);
