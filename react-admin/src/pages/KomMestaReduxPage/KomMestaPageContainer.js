import { connect } from 'react-redux';
import Page from './KomMestaPageComponent';

import { selectKomMestaData, fetchKomMesta } from '../../store';

const mapStateToProps = state => ({
  data: selectKomMestaData(state),
});

const mapDispatchToProps = {
  fetchKomMesta,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
