import appSagas from './app';
import artPdvsSagas from './artPdvs';
import artMainSagas from './artMain';
import artGroupSagas from './artGroup';

export default [
  ...appSagas,
  ...artPdvsSagas,
  ...artMainSagas,
  ...artGroupSagas,
];
