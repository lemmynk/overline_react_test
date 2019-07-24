const { Model } = require('@newtash/node-api-core');

const modelConfig = {
  tableName: 'cng_descriptions',
  keys: [
    'id',
    'cngId',
    'paragraph',
    'position',
    'isLive',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class CngDescription extends Model {
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
      ['cngId', 'paragraph', 'position'],
      params,
    );
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = CngDescription;
