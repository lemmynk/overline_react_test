const { Model } = require('@newtash/node-api-core');

const modelConfig = {
  tableName: 'mp_kom_mesto',
  keys: [
    'id',
    'zip',
    'naziv',
    'opstina',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class KomMesto extends Model {
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
      .validateRequired(['zip', 'naziv', 'opstina'], params)
      .validateStringLength(params, 'zip', 6)
      .validateStringLength(params, 'naziv', 120)
      .validateStringLength(params, 'opstina', 120);
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = KomMesto;
