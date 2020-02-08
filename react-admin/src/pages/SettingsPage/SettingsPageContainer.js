import { connect } from 'react-redux';
import SettingsPageView from './SettingsPageView';
import { selectAppConfigData, selectAppConfigValue } from '../../store';

const mapStateToProps = state => ({
  data: selectAppConfigData(state),
  appConfig: selectAppConfigValue(state),
});

export default connect(mapStateToProps)(SettingsPageView);
