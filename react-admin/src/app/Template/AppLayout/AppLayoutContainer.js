import { connect } from 'react-redux';
import AppLayout from '@newtash/core/AppLayout';
import { selectAppErrors, clearAppErrors } from '../../../store';

const mapStateToProps = state => ({
  appErrors: selectAppErrors(state),
});

const mapDispatchToProps = {
  clearAppErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
