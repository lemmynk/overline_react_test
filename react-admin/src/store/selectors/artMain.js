import { createSelector } from 'reselect';
import reduxState from '../reduxState';
import { FETCH_STATUS_FETCHING } from '../../config';
import { selectArtGroupData } from './artGrupa';
import { sortByKey } from '../../utils';

const { ART_MAIN } = reduxState;

export const selectArtMainItemData = state => state[ART_MAIN].itemData;
export const selectArtMainData = state => state[ART_MAIN].data;
export const selectArtMainPagination = state => state[ART_MAIN].pagination;
export const selectArtMainFetching = state => state[ART_MAIN].fetching;
export const selectArtMainVArtikl = state => state[ART_MAIN].vArtikl;

export const selectArtMainIsFetching = createSelector(
  [selectArtMainFetching],
  fetching => fetching === FETCH_STATUS_FETCHING,
);

export const selectArtMainGrpOptions = createSelector(
  [selectArtGroupData, selectArtMainVArtikl],
  (data, vArtikl) => {
    const options = data
      .filter(item => item.vArtikl === vArtikl)
      .sort(sortByKey('grpNaziv'))
      .map(item => ({
        key: item.id,
        text: item.grpNaziv,
      }));
    return [{ key: '', text: `artMain.grpOptions.${vArtikl}` }, ...options];
  },
);
