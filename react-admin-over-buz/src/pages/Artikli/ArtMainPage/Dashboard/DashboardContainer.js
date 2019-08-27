import { connect } from 'react-redux';
import { selectAppConfigValue } from '@newtash/react-app-core';
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
  selectArtPdvDefault,
} from '../../../../store';

const mapStateToProps = state => ({
  vArtikl: selectArtMainDashVArtikl(state),
  fetching: selectArtMainDashFetching(state),
  data: selectArtMainDashData(state),
  paging: selectArtMainDashPaging(state),
  filterText: selectArtMainDashFilterText(state),
  filterSelect: selectArtMainDashFilterSelect(state),
  artGroups: selectArtGroupSelectOptions(state),
  getConfigValue: selectAppConfigValue(state),
  defaultPdv: selectArtPdvDefault(state),
});

const mapDispatchToProps = {
  setVArtikl: setArtMainDashVArtikl,
  setFilterText: setArtMainDashFilterText,
  setFilterSelect: setArtMainDashFilterSelect,
  fetchData: fetchArtMainDashData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
