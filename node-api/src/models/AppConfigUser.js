/* eslint class-methods-use-this: ["error", { "exceptMethods": ["excludeAlways"] }] */
const Model = require('./Model');

const modelConfig = {
  tableName: 'app_config_user',
  keys: [
    'id',
    'appConfigId',
    'userId',
    'value',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class AppConfigUser extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  /**
   * Validate params provided
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static validate(params) {
    this.clearValidationErrors().validateRequired(
      ['appConfigId', 'userId', 'value'],
      params,
    );
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = AppConfigUser;
