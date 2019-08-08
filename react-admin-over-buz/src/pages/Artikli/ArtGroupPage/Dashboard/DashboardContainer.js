import { connect } from 'react-redux';
import DashboardComponent from './DashboardComponent';
import {
  selectArtGroupVArtikl,
  selectArtGroupsData,
  selectArtGroupDashFetching,
  selectArtGroupDashFilterText,
  fetchArtGroups,
  setArtGroupDashVArtikl,
  setArtGroupDashFilterText,
} from '../../../../store';

const mapStateToProps = state => ({
  vArtikl: selectArtGroupVArtikl(state),
  fetching: selectArtGroupDashFetching(state),
  data: selectArtGroupsData(state),
  filterText: selectArtGroupDashFilterText(state),
});

const mapDispatchToProps = {
  setVArtikl: setArtGroupDashVArtikl,
  setFilterText: setArtGroupDashFilterText,
  fetchData: fetchArtGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
