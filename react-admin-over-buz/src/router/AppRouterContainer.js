import { connect } from 'react-redux';
import { doInitApp } from '@newtash/react-app-core';
import AppRouter from './AppRouter';

const mapDispatchToProps = {
  doInitApp,
};

export default connect(
  null,
  mapDispatchToProps,
)(AppRouter);
