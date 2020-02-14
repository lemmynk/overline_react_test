import { connect } from 'react-redux';
import Page from './ArtGroupsPageComponent';
import {
  // selectArtGroupData,
  selectArtGroupVArtikl,
  selectArtGroupDataByVArtikl,
  setArtGroupsVArtikl,
  fetchArtGroups,
  initForm,
  deleteForm,
} from '../../store';

const mapStateToProps = state => ({
  vArtikl: selectArtGroupVArtikl(state),
  data: selectArtGroupDataByVArtikl(state),
});

const mapDispatchToProps = {
  setArtGroupsVArtikl,
  fetchArtGroups,
  initForm,
  deleteForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
