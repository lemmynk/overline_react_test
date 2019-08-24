import { createSelector } from 'reselect';
import _groupBy from 'lodash/groupBy';
import { appNamespace, sortByKey } from '@newtash/react-app-core';

const NS = `${appNamespace}/artGroup`;

export const selectArtGroupsData = state => state[NS].data;
export const selectArtGroupsVersion = state => state[NS].version;
export const selectArtGroupDashVArtikl = state => state[NS].dashVArtikl;
export const selectArtGroupDashFetching = state => state[NS].dashFetching;
export const selectArtGroupDashFilterText = state => state[NS].dashFilterText;

/*
const selectAllSortedArtGroups = createSelector(
  [selectArtGroupsData],
  groups =>
    Object.keys(groups)
      .map(key => ({
        key: groups[key].id,
        text: groups[key].grpNaziv,
        vArtikl: groups[key].vArtikl,
      }))
      .sort(sortByKey('grpNaziv')),
);
*/

const selectArtGroupsArray = createSelector(
  selectArtGroupsData,
  data => Object.keys(data).map(key => data[key]),
);

const selectNonDeletedGroupsArray = createSelector(
  selectArtGroupsArray,
  data => data.filter(item => !item.isDeleted),
);

const selectSortedArtGroupsArray = createSelector(
  selectNonDeletedGroupsArray,
  data => data.sort(sortByKey('grpNaziv')),
);

export const selectArtGroupDashData = createSelector(
  selectSortedArtGroupsArray,
  data => _groupBy(data, n => n.vArtikl),
);

const selectTransformedGroups = createSelector(
  selectSortedArtGroupsArray,
  data =>
    data.map(item => ({
      key: item.id,
      text: item.grpNaziv,
      vArtikl: item.vArtikl,
    })),
);

export const selectArtGroupSelectOptions = createSelector(
  selectTransformedGroups,
  data => _groupBy(data, n => n.vArtikl),
);
