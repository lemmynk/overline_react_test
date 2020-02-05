// @flow
import React from 'react';
import { rand } from '@newtash/core/utils';
import NavItem from './NavItem';
import { headerAppLinks } from '../../../../config';
import styles from './Navigation.module.scss';

export default () => {
  return (
    <ul className={styles.navigation}>
      {headerAppLinks &&
        headerAppLinks.map(item => <NavItem key={rand()} item={item} />)}
    </ul>
  );
};
