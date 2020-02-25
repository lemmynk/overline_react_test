// @flow
import React, { type Node } from 'react';
import { AppConfigProvider } from '../AppConfigProvider';

type Props = {
  children: Node,
};

// eslint-disable-next-line import/prefer-default-export
export const AppDataProvider = ({ children }: Props) => {
  // eslint-disable-next-line no-console
  console.log('AppDataProvider render');

  return <AppConfigProvider>{children}</AppConfigProvider>;
};
