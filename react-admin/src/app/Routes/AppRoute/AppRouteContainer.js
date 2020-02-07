import { connect } from 'react-redux';
import AppRoute from './AppRoute';
import { setAppRedirectUrl } from '../../../store/actions';
import {
  selectWhoAmIRbac,
  selectIsAuthenticated,
} from '../../../store/selectors';

const mapStateToProps = (state, props) => ({
  isAuthenticated: selectIsAuthenticated(state),
  hasPermission: selectWhoAmIRbac(state, props),
});

const mapDispatchToProps = {
  setAppRedirectUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);
