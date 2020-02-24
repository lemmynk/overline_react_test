const Model = require('./Model');

const modelConfig = {
  tableName: 'vw_app_config_user',
  keys: [
    'id',
    'userId',
    'appConfigId',
    'catId',
    'catName',
    'name',
    'valueType',
    'value',
    'userSpecific',
    'description',
    'updatedAt',
    'isDeleted',
  ],
};

class AppConfigView extends Model {
  constructor(props) {
    super(props, modelConfig);
  }
}

module.exports = AppConfigView;
