// @flow
import React, { useState, Suspense } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import SuspenseFallback from '@newtash/core/SuspenseFallback';
import Icon from '@newtash/core/Icon';
import { DropRight } from '@newtash/core/Dropdown';
import { NavList } from '@newtash/core/Nav';
import styles from './Navigation.module.scss';

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
      <Suspense fallback={<SuspenseFallback />}>
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
              <Icon icon={icon} />
            </div>
            <DropRight
              isOpen={isDropdownOpen}
              compact
              onDismiss={() => setIsDropDownOpen(false)}
            >
              <NavList
                item={item}
                activeUrl={activeUrl}
                onLinkClick={() => setIsDropDownOpen(false)}
              />
            </DropRight>
          </div>
        )}
        {!hasLinks && (
          <Link to={url} title={title} tabIndex={-1}>
            <div className={styles.iconArea}>
              <Icon icon={icon} />
            </div>
          </Link>
        )}
      </Suspense>
    </li>
  );
};

export default withRouter(NavLink);
