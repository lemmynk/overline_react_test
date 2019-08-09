import { connect } from 'react-redux';
import ArtGroupPage from './ArtGroupPage';
import {
  selectArtGroupDashVArtikl,
  setArtGroupDashVArtikl,
  saveArtGroup,
  deleteArtGroup,
} from '../../../store';

const mapStateToProps = state => ({
  vArtikl: selectArtGroupDashVArtikl(state),
});

const mapDispatchToProps = {
  setVArtikl: setArtGroupDashVArtikl,
  doSave: saveArtGroup,
  doDelete: deleteArtGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtGroupPage);
