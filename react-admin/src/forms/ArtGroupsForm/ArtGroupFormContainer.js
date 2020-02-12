import { connect } from 'react-redux';
import Form from './ArtGroupFormComponent';
import {
  selectFormData,
  selectFormFetching,
  selectFormErrors,
  saveForm,
  clearFormErrors,
  fetchArtGroups,
} from '../../store';

const mapStateToProps = state => ({
  fetching: selectFormFetching(state),
  data: selectFormData(state),
  validationErrors: selectFormErrors(state),
});

const mapDispatchToProps = {
  saveForm,
  clearValidationErrors: clearFormErrors,
  fetchArtGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
