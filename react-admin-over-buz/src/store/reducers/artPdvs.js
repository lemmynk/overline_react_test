import { SET_ART_PDVS } from '../actions';

const artPdvs = (state = [], action) =>
  action.type === SET_ART_PDVS ? action.payload : state;

export default artPdvs;
