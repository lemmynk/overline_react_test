// @flow
import React, { Suspense } from 'react';
import SuspenseFallback from '@newtash/core/SuspenseFallback';
import { rand } from '@newtash/core/utils';
import NavItem from './NavItem';
import { headerAppLinks } from '../../../../config';
import styles from './Navigation.module.scss';

export default () => {
  return (
    <ul className={styles.navigation}>
      {headerAppLinks &&
        headerAppLinks.map(item => (
          <Suspense key={rand()} fallback={<SuspenseFallback />}>
            <NavItem item={item} />
          </Suspense>
        ))}
    </ul>
  );
};
