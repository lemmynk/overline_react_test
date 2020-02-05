// @flow
import React from 'react';
import Navigation from './Navigation';
import Settings from './Settings';
import styles from './Sidebar.module.scss';

export default (props: RenderSidebarProps) => {
  const { onMenuItemClick } = props;

  return (
    <div className={styles.sidebarContent}>
      <div className={styles.linksArea}>
        <div className={styles.linksScroll}>
          <Navigation onMenuItemClick={onMenuItemClick} />
        </div>
      </div>
      <div className={styles.settingsArea}>
        <Settings />
      </div>
    </div>
  );
};
