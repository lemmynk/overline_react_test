import { createSelector } from 'reselect';
import reduxState from '../reduxState';
import { sortByKey } from '../../utils';

const { ART_GRUPA } = reduxState;

export const selectArtGroupData = state => state[ART_GRUPA].data;
export const selectArtGroupVersion = state => state[ART_GRUPA].version;
export const selectArtGroupVArtikl = state => state[ART_GRUPA].vArtikl;

export const selectArtGroupDataByVArtikl = createSelector(
  [selectArtGroupData, selectArtGroupVArtikl],
  (data, vArtikl) =>
    data.filter(item => item.vArtikl === vArtikl).sort(sortByKey('grpNaziv')),
);

export const selectArtGroupSelectOptions = createSelector(
  selectArtGroupDataByVArtikl,
  data =>
    data.map(item => ({
      key: item.id,
      text: item.grpNaziv,
    })),
);
