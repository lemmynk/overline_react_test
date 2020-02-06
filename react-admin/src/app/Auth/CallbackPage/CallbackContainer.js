// @flow
import { connect } from 'react-redux';
import CallbackComponent from './CallbackComponent';
import { doAuthentication } from '../../../store/actions';
import {
  selectIsAuthenticated,
  selectAppRedirectUrl,
} from '../../../store/selectors';

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
  redirectUrl: selectAppRedirectUrl(state),
});

const mapDispatchToProps = {
  doAuthentication,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CallbackComponent);
