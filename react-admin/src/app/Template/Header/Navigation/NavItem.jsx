// @flow
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Navigation.module.scss';
import { LOGOUT_PAGE_PATH } from '../../../../config';

type Props = {
  item: AppLinkProps,
};

const NavItem = (props: Props) => {
  const { item } = props;
  const { url, title, icon } = item;
  const location = useLocation();

  const { pathname: activeUrl } = location;

  const linkUrl =
    url === LOGOUT_PAGE_PATH
      ? {
          pathname: LOGOUT_PAGE_PATH,
          from: activeUrl,
        }
      : url;

  const [t] = useTranslation('nav');

  const isActive = activeUrl === url;

  return (
    <li
      className={classNames({
        [styles.navItem]: true,
        [styles.active]: isActive,
      })}
    >
      <Link to={linkUrl} title={t(title)} tabIndex={-1}>
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

export default NavItem;
