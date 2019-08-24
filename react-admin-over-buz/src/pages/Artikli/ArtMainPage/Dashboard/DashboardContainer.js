import { connect } from 'react-redux';
import DashboardComponent from './DashboardComponent';
import {
  selectArtMainDashVArtikl,
  selectArtMainDashData,
  selectArtMainDashPaging,
  selectArtMainDashFetching,
  selectArtMainDashFilterText,
  selectArtGroupSelectOptions,
  selectArtMainDashFilterSelect,
  fetchArtMainDashData,
  setArtMainDashVArtikl,
  setArtMainDashFilterText,
  setArtMainDashFilterSelect,
  deleteArtMainFormData,
} from '../../../../store';

const mapStateToProps = state => ({
  vArtikl: selectArtMainDashVArtikl(state),
  fetching: selectArtMainDashFetching(state),
  data: selectArtMainDashData(state),
  paging: selectArtMainDashPaging(state),
  filterText: selectArtMainDashFilterText(state),
  filterSelect: selectArtMainDashFilterSelect(state),
  artGroups: selectArtGroupSelectOptions(state),
});

const mapDispatchToProps = {
  setVArtikl: setArtMainDashVArtikl,
  setFilterText: setArtMainDashFilterText,
  setFilterSelect: setArtMainDashFilterSelect,
  fetchData: fetchArtMainDashData,
  doDelete: deleteArtMainFormData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
