const Model = require('./Model');

const modelConfig = {
  tableName: 'vw_app_config',
  keys: [
    'id',
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
