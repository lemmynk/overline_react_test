import { connect } from 'react-redux';
import DashboardComponent from './DashboardComponent';
import {
  selectArtGroupDashData,
  selectArtGroupDashFetching,
  selectArtGroupDashFilterText,
  fetchArtGroups,
  setArtGroupDashFilterText,
} from '../../../../store';

const mapStateToProps = state => ({
  fetching: selectArtGroupDashFetching(state),
  data: selectArtGroupDashData(state),
  filterText: selectArtGroupDashFilterText(state),
});

const mapDispatchToProps = {
  setFilterText: setArtGroupDashFilterText,
  fetchData: fetchArtGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
