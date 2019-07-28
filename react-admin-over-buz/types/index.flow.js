// @flow
import { type Node } from 'react';

declare type KeyTextObject = {
  key: string,
  text: string,
};

declare type TableColumnProps = {
  key: string,
  text: string,
  field?: string,
  width?: string,
  align?: string,
  onRenderItem?: any => Node,
};

declare type GroupedSelectArrayProps = {
  [string]: Array<KeyTextObject>,
};

declare type ParagraphProps = {
  paragraph: string,
  position: number,
};

declare type ButtonProps = {
  text: string,
  disabled?: boolean,
  onClick: () => void,
};

declare type ThemeProps = {
  color: any,
  fontColor: any,
  size: any,
  header: any,
  footer: any,
  sidebar: any,
};

declare type SelectSearchFilterBarProps = {
  labelSelect: string,
  labelText: string,
  selectOptions: Array<KeyTextObject>,
  filterSelect: number,
  filterText: string,
  setSelectFilter: number => void,
  setFilterText: string => void,
  clearFilterText: () => void,
};

declare type NavTabItemProps = {
  key: string,
  text: string,
  disabled?: boolean,
  onRenderItem?: NavTabItemProps => Node,
};
