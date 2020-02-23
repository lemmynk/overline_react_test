const Model = require('./Model');

const modelConfig = {
  tableName: 'app_config_categories',
  keys: ['id', 'name', 'createdAt', 'updatedAt', 'deletedAt'],
};

class AppConfigCategory extends Model {
  constructor(props) {
    super(props, modelConfig);
  }
}

module.exports = AppConfigCategory;
