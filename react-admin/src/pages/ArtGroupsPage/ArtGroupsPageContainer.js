import { connect } from 'react-redux';
import Page from './ArtGroupsPageComponent';
import {
  // selectArtGroupData,
  selectArtGroupVArtikl,
  selectArtGroupDataByVArtikl,
  setArtGroupsVArtikl,
} from '../../store';

const mapStateToProps = state => ({
  vArtikl: selectArtGroupVArtikl(state),
  data: selectArtGroupDataByVArtikl(state),
});

const mapDispatchToProps = {
  setArtGroupsVArtikl,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
