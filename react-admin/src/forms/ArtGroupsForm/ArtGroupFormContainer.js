import { connect } from 'react-redux';
import Form from './ArtGroupFormComponent';
import {
  selectFormData,
  selectFormFetching,
  selectFormErrors,
  saveForm,
  clearFormErrors,
} from '../../store';

const mapStateToProps = state => ({
  fetching: selectFormFetching(state),
  data: selectFormData(state),
  validationErrors: selectFormErrors(state),
});

const mapDispatchToProps = {
  saveForm,
  clearValidationErrors: clearFormErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
