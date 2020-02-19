import { connect } from 'react-redux';
import Form from './ArtMainFormComponent';
import {
  selectFormData,
  selectFormFetching,
  selectFormDataFetching,
  selectFormErrors,
  selectArtGroupSelectOptions,
  selectArtPdvSelectOptions,
  saveForm,
  deleteForm,
  clearFormErrors,
  fetchFormData,
} from '../../store';

const mapStateToProps = state => ({
  initialData: selectFormData(state),
  formFetching: selectFormFetching(state),
  dataFetching: selectFormDataFetching(state),
  formErrors: selectFormErrors(state),
  grpOptions: selectArtGroupSelectOptions(state),
  pdvOptions: selectArtPdvSelectOptions(state),
});

const mapDispatchToProps = {
  fetchFormData,
  clearFormErrors,
  saveForm,
  deleteForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
