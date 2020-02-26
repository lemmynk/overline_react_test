// @flow
import React, { type Node } from 'react';
import { AppConfigProvider } from '../AppConfigProvider';
import { AppDataProvider } from './Context';

type Props = {
  children: Node,
};

export default ({ children }: Props) => {
  return (
    <AppConfigProvider>
      <AppDataProvider>{children}</AppDataProvider>
    </AppConfigProvider>
  );
};
