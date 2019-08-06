import { createSelector } from 'reselect';
import { appNamespace, sortByKey } from '@newtash/react-app-core';

const NS = `${appNamespace}/artGroup`;

export const selectArtGroupsData = state => state[NS].data;
export const selectArtGroupsVersion = state => state[NS].version;

export const selectArtGroupSelectOptions = vArtikl =>
  createSelector(
    [selectArtGroupsData],
    groups =>
      Object.keys(groups)
        .filter(key => groups[key].vArtikl === vArtikl)
        .map(key => ({
          key: groups[key].id,
          text: groups[key].grpNaziv,
        }))
        .sort(sortByKey('grpNaziv')),
  );
