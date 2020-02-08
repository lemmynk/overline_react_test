// @flow
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropRight } from '@newtash/core/Dropdown';
import { NavList } from '@newtash/core/Nav';
import styles from './Navigation.module.scss';
import { translateLinkItem } from '../../../../utils';

type Props = {
  item: AppLinkProps,
  history: ReactRouterHistory,
};

const NavLink = (props: Props) => {
  const { item, history } = props;
  const { url, title, icon, links } = item;
  const {
    location: { pathname: activeUrl },
  } = history;

  const [t] = useTranslation('nav');

  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const hasLinks = links && links.length > 0;
  const isActive = activeUrl === url;

  const isGroupActive = () => {
    if (!hasLinks) {
      return false;
    }
    const activeItems = links.filter(link => link.url === activeUrl);
    return activeItems && activeItems.length > 0;
  };

  return (
    <li
      className={classNames({
        [styles.navLink]: true,
        [styles.active]: isActive,
      })}
    >
      {hasLinks && (
        <div
          className={classNames({
            [styles.linkGroup]: true,
            [styles.active]: isGroupActive(),
          })}
          onMouseEnter={() => setIsDropDownOpen(true)}
          onMouseLeave={() => setIsDropDownOpen(false)}
        >
          <div className={styles.iconArea}>
            <FontAwesomeIcon icon={icon} />
          </div>
          <DropRight
            isOpen={isDropdownOpen}
            compact
            onDismiss={() => setIsDropDownOpen(false)}
          >
            <NavList
              item={translateLinkItem(t, item)}
              activeUrl={activeUrl}
              onLinkClick={() => setIsDropDownOpen(false)}
            />
          </DropRight>
        </div>
      )}
      {!hasLinks && (
        <Link to={url} title={t(title)} tabIndex={-1}>
          <div className={styles.iconArea}>
            <FontAwesomeIcon icon={icon} />
          </div>
        </Link>
      )}
    </li>
  );
};

export default withRouter(NavLink);
