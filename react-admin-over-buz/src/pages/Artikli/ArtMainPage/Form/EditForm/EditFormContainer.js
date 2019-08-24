import { connect } from 'react-redux';
import EditForm from './EditForm';
import { fetchArtMainFormData } from '../../../../../store';

const mapDispatchToProps = {
  fetchArtMainFormData,
};

export default connect(
  null,
  mapDispatchToProps,
)(EditForm);
