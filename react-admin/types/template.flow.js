// @flow
import { type Node } from 'react';

declare type RenderSidebarProps = {
  // links: Array<AppLinkProps>,
  onMenuItemClick: () => void,
};

declare type RenderHeaderProps = {
  // links: Array<AppLinkProps>,
  isSidebarOpen: boolean,
  toggleSidebar: () => void,
};

declare type RenderFooterProps = {};

declare type AppLinkProps = {
  title: string,
  url: string,
  icon: string,
  links: Array<AppLinkProps>,
  isOpen?: boolean,
  renderBadge?: () => Node,
};
