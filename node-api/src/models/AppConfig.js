const Model = require('./Model');

const modelConfig = {
  tableName: 'app_config',
  keys: [
    'id',
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

  /**
   * Validate params provided
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static validate(params) {
    this.clearValidationErrors()
      .validateRequired(['name', 'valueType', 'value'], params)
      .validateStringLength(params, 'name', 120)
      .validateEnum(params, 'valueType', [
        'string',
        'number',
        'boolean',
        'json',
      ]);
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = AppConfig;
