import { connect } from 'react-redux';
import HomeRoute from './HomeRoute';
import { selectIsAuthenticated, selectHasAuth } from '../../../store/selectors';

const mapStateToProps = state => ({
  hasAuth: selectHasAuth(state),
  isAuthenticated: selectIsAuthenticated(state),
});

export default connect(mapStateToProps)(HomeRoute);
