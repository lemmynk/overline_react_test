const Model = require('./Model');

const modelConfig = {
  tableName: 'vw_app_config',
  keys: [
    'id',
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

  static toValue(item) {
    switch (item.valueType) {
      case 'number':
        return Number(item.value);
      case 'boolean':
        return Boolean(item.value);
      case 'json':
        return item.value && item.value.length > 0
          ? JSON.parse(item.value)
          : null;
      default:
        return item.value;
    }
  }
}

module.exports = AppConfigView;
