import { appNamespace } from '@newtash/react-app-core';

const NS = `${appNamespace}/pdv`;

export const selectArtPdvSelectOptions = state =>
  state[NS].map(item => ({
    key: item.id,
    text: item.pdvOpis,
  }));

export const selectArtPdvDefault = state =>
  state[NS].filter(item => item.isDefault).shift();
