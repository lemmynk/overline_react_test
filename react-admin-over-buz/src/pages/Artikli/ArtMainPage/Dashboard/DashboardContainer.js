import { connect } from 'react-redux';
import DashboardComponent from './DashboardComponent';
import {
  selectArtMainDashVArtikl,
  selectArtMainDashData,
  selectArtMainDashPaging,
  selectArtMainDashFetching,
  selectArtMainDashFilterText,
  fetchArtMainDashData,
  setArtMainDashVArtikl,
  setArtMainDashFilterText,
} from '../../../../store';

const mapStateToProps = state => ({
  vArtikl: selectArtMainDashVArtikl(state),
  fetching: selectArtMainDashFetching(state),
  data: selectArtMainDashData(state),
  paging: selectArtMainDashPaging(state),
  filterText: selectArtMainDashFilterText(state),
});

const mapDispatchToProps = {
  setVArtikl: setArtMainDashVArtikl,
  setFilterText: setArtMainDashFilterText,
  fetchData: fetchArtMainDashData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
