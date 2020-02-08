import { createSelector } from 'reselect';
import reduxState from '../reduxState';

const { ART_GRUPA } = reduxState;

export const selectArtGroupData = state => state[ART_GRUPA].data;
export const selectArtGroupVersion = state => state[ART_GRUPA].version;

export const selectArtGroupSelectOptions = createSelector(
  selectArtGroupData,
  data =>
    data.map(item => ({
      key: item.id,
      text: item.grpNaziv,
    })),
);
