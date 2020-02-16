import { connect } from 'react-redux';
import Form from './ArtMainFormComponent';
import { selectFormData, fetchFormData } from '../../store';

const mapStateToProps = state => ({
  data: selectFormData(state),
});

const mapDispatchToProps = {
  fetchFormData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
