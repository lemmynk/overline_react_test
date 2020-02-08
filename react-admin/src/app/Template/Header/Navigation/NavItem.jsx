// @flow
import React, { Suspense } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import SuspenseFallback from '@newtash/core/SuspenseFallback';
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

  const isActive = activeUrl === url;

  return (
    <li
      className={classNames({
        [styles.navItem]: true,
        [styles.active]: isActive,
      })}
    >
      <Suspense fallback={<SuspenseFallback />}>
        <Link to={url} title={title} tabIndex={-1}>
          <div className={styles.navItemArea}>
            {icon && (
              <div className={styles.iconArea}>
                <FontAwesomeIcon icon={icon} />
              </div>
            )}
            <div className={styles.title}>{title}</div>
          </div>
        </Link>
      </Suspense>
    </li>
  );
};

export default withRouter(NavItem);
