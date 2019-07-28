import { connect } from 'react-redux';
import { doInitApp } from '@newtash/react-app-core';
import DashboardPageComponent from './DashboardPageComponent';

const mapDispatchToProps = {
  doInitApp,
};

export default connect(
  null,
  mapDispatchToProps,
)(DashboardPageComponent);
