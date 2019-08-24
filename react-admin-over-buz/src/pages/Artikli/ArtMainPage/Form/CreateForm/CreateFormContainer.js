import { connect } from 'react-redux';
import { selectAppConfigValue } from '@newtash/react-app-core';
import CreateForm from './CreateForm';
import { selectArtPdvDefault, setArtMainFormData } from '../../../../../store';

const mapStateToProps = state => ({
  getConfigValue: selectAppConfigValue(state),
  defaultPdv: selectArtPdvDefault(state),
});

const mapDispatchToProps = {
  setArtMainFormData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateForm);
