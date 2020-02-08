import { createSelector } from 'reselect';
import reduxState from '../reduxState';

const { ART_PDV } = reduxState;

export const selectArtPdvData = state => state[ART_PDV].data;
export const selectArtPdvVersion = state => state[ART_PDV].version;

export const selectArtPdvSelectOptions = createSelector(
  selectArtPdvData,
  data =>
    data.map(item => ({
      key: item.id,
      text: `${item.pdvOpis} - ${item.pdvStopa}%`,
    })),
);

export const selectArtPdvDefault = createSelector(selectArtPdvData, data =>
  data.filter(item => item.isDefault).shift(),
);
