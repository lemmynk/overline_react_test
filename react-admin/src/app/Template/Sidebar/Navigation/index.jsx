// @flow
import React from 'react';
import SuspenseFallback from '@newtash/core/SuspenseFallback';
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
        sidebarAppLinks.map(item => (
          <SuspenseFallback key={rand()}>
            <NavLink item={item} />
          </SuspenseFallback>
        ))}
    </ul>
  );
};
