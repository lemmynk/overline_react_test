import { appNamespace } from '@newtash/react-app-core';

const NS = `${appNamespace}/artMain`;

export const selectArtMainDashVArtikl = state => state[NS].vArtikl;
export const selectArtMainDashData = state => state[NS].dashData;
export const selectArtMainDashPaging = state => state[NS].dashPaging;
export const selectArtMainDashFetching = state => state[NS].dashFetching;
export const selectArtMainDashFilterText = state => state[NS].dashFilterText;
