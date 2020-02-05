// @flow
import React from 'react';
import ToggleButton from './ToggleButton';
import Navigation from './Navigation';
import styles from './Header.module.scss';

export default (props: RenderHeaderProps) => {
  const { isSidebarOpen, toggleSidebar } = props;

  return (
    <div className={styles.header}>
      <div className={styles.toggleArea}>
        <ToggleButton
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className={styles.navArea}>
        <Navigation />
      </div>
      <div className={styles.avatarArea}>
        <div>...</div>
      </div>
    </div>
  );
};
