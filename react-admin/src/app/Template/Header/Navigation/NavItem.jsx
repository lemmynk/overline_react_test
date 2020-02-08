// @flow
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Navigation.module.scss';

type Props = {
  item: AppLinkProps,
  history: ReactRouterHistory,
};

const NavItem = (props: Props) => {
  const { item, history } = props;
  const { url, title, icon } = item;

  const {
    location: { pathname: activeUrl },
  } = history;

  const [t] = useTranslation('nav');

  const isActive = activeUrl === url;

  return (
    <li
      className={classNames({
        [styles.navItem]: true,
        [styles.active]: isActive,
      })}
    >
      <Link to={url} title={t(title)} tabIndex={-1}>
        <div className={styles.navItemArea}>
          {icon && (
            <div className={styles.iconArea}>
              <FontAwesomeIcon icon={icon} />
            </div>
          )}
          <div className={styles.title}>{t(title)}</div>
        </div>
      </Link>
    </li>
  );
};

export default withRouter(NavItem);
