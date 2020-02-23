const Model = require('./Model');

const modelConfig = {
  tableName: 'app_config',
  keys: [
    'id',
    'catId',
    'name',
    'valueType',
    'value',
    'userSpecific',
    'description',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class AppConfig extends Model {
  constructor(props) {
    super(props, modelConfig);
  }
}

module.exports = AppConfig;
