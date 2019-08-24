import { connect } from 'react-redux';
import Form from './Form';
import {
  saveArtMainFormData,
  selectArtMainFormData,
  selectArtMainFormFetching,
  selectArtGroupSelectOptions,
  selectArtPdvSelectOptions,
} from '../../../../../store';

const mapStateToProps = state => ({
  fetching: selectArtMainFormFetching(state),
  initialState: selectArtMainFormData(state),
  grpSelectOptions: selectArtGroupSelectOptions(state),
  pdvSelectOptions: selectArtPdvSelectOptions(state),
});

const mapDispatchToProps = {
  saveData: saveArtMainFormData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
