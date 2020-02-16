import { connect } from 'react-redux';
import ArtMainPageComponent from './ArtMainPageComponent';
import {
  selectArtMainData,
  selectArtMainPagination,
  selectArtMainIsFetching,
  selectArtMainVArtikl,
  selectArtMainGrpOptions,
  clearArtMainData,
  setArtMainVArtikl,
  fetchArtMain,
  initForm,
} from '../../store';

const mapStateToProps = state => ({
  vArtikl: selectArtMainVArtikl(state),
  isFetching: selectArtMainIsFetching(state),
  data: selectArtMainData(state),
  pagination: selectArtMainPagination(state),
  grpOptions: selectArtMainGrpOptions(state),
});

const mapDispatchToProps = {
  clearArtMainData,
  setArtMainVArtikl,
  fetchArtMain,
  initForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtMainPageComponent);
