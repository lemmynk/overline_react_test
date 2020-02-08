const Model = require('./Model');

const modelConfig = {
  tableName: 'mp_art_pdv',
  keys: [
    'id',
    'pdvStopa',
    'pdvOpis',
    'isDefault',
    'fisPdv',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class ArtPdv extends Model {
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
      .validateRequired(['pdvStopa', 'pdvOpis', 'isDefault', 'fisPdv'], params)
      .validateStringLength(params, 'pdvOpis', 120);
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = ArtPdv;
