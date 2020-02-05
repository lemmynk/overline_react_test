// @flow
import React from 'react';
import styles from './ToggleButton.module.scss';

type Props = {
  isSidebarOpen: boolean,
  toggleSidebar: () => void,
};

export default (props: Props) => {
  const { isSidebarOpen, toggleSidebar } = props;

  const handleToggleButtonClick = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleToggleButtonClick}
    >
      {isSidebarOpen ? 'C' : 'O'}
    </button>
  );
};
