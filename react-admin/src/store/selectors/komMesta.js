import { createSelector } from 'reselect';
import reduxState from '../reduxState';
import { sortByKey } from '../../utils';

const { KOM_MESTA } = reduxState;

export const selectKomMestaData = state => state[KOM_MESTA].data;
export const selectKomMestaVersion = state => state[KOM_MESTA].version;

export const selectKomMestaSelectOptions = createSelector(
  selectKomMestaData,
  data =>
    data
      .map(item => ({
        key: item.id,
        text: item.naziv,
      }))
      .sort(sortByKey('text')),
);
