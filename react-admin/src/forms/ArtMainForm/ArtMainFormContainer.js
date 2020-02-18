import { connect } from 'react-redux';
import Form from './ArtMainFormComponent';
import {
  selectFormData,
  selectFormFetching,
  selectFormErrors,
  saveForm,
  clearFormErrors,
  fetchFormData,
} from '../../store';

const mapStateToProps = state => ({
  fetching: selectFormFetching(state),
  data: selectFormData(state),
  validationErrors: selectFormErrors(state),
});

const mapDispatchToProps = {
  fetchFormData,
  clearFormErrors,
  saveForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
