import appSagas from './app';
import artPdvsSagas from './artPdvs';
import artMainSagas from './artMain';

export default [...appSagas, ...artPdvsSagas, ...artMainSagas];
