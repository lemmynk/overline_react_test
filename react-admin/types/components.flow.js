// @flow
import { type Node } from 'react';

declare type AccordionStyles = {
  activeBorderColor?: string,
};

declare type NavStyles = {
  iconPadding?: string,
};

declare type TabItemProps = {
  key: string,
  title: string,
  icon: string,
  disabled: boolean,
};

declare type CalendarStringsProps = {
  firstDayOfWeek: number,
  yearsBefore: number,
  yearsAfter: number,
  shortDays: Array<string>,
  longDays: Array<string>,
  shortMonths: Array<string>,
  longMonths: Array<string>,
};

declare type TableColumnProps = {
  key: string,
  text: string,
  field: string,
  width: string,
  align: string,
  onRenderItem: Data => Node,
  sortable: boolean,
};

declare type PaginationProps = {
  currentPage: number,
  totalItems: number,
  perPage: number,
  dataLength: number,
};

declare type PaginationButtonProps = {
  renderTitle?: () => Node,
  page: number,
  disabled: boolean,
  selected?: boolean,
  fetching?: boolean,
  onClick?: () => void,
};

declare type PaginationDescriptionProps = {
  currentPage: number,
  currentItems: number,
  totalPages: number,
  totalItems: number,
  itemsPerPage: number,
};

declare type PaginatedDataProps = {
  data: Array<any>,
  pagination: PaginationProps,
};
