// @flow
import { connect } from 'react-redux';
import LogoutPage from './LogoutPage';
import { doLogout } from '../../../store/actions';

const mapDispatchToProps = {
  doLogout,
};

export default connect(
  null,
  mapDispatchToProps,
)(LogoutPage);
