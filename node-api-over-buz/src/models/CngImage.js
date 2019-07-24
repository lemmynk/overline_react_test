const { Model } = require('@newtash/node-api-core');

const modelConfig = {
  tableName: 'cng_images',
  keys: [
    'id',
    'cngId',
    'assetId',
    'position',
    'isLive',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class CngImage extends Model {
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
      ['cngId', 'assetId', 'position'],
      params,
    );
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = CngImage;
