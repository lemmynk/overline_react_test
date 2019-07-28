import { connect } from 'react-redux';
import { doInitApp } from '@newtash/react-app-core';
import Router from './Router';

const mapDispatchToProps = {
  doInitApp,
};

export default connect(
  null,
  mapDispatchToProps,
)(Router);
