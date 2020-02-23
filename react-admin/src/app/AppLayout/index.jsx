/* eslint-disable react/jsx-props-no-spreading */
// @flow
import React from 'react';
import AppLayout from '@newtash/core/AppLayout';
import { useAppErrors } from '@newtash/core';

export default (props: any) => {
  const { appErrors, clearAppErrors } = useAppErrors();

  return (
    <AppLayout
      {...props}
      appErrors={appErrors}
      clearAppErrors={clearAppErrors}
    />
  );
};
