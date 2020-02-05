// @flow
import React from 'react';
import { rand } from '@newtash/core/utils';
import NavLink from './NavLink';
import { sidebarAppLinks } from '../../../../config';
import styles from './Navigation.module.scss';

// type Props = {
//   onMenuItemClick: () => void,
// };

// export default (props: Props) => {
export default () => {
  // const { onMenuItemClick } = props;

  return (
    <ul className={styles.navigation}>
      {sidebarAppLinks &&
        sidebarAppLinks.map(item => <NavLink key={rand()} item={item} />)}
    </ul>
  );
};
