const Model = require('./Model');
const { validator } = require('../utils');

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
   * Validate params provided using express-validator
   *
   * @return {Array}
   */
  static validate() {
    return [
      validator.validateInteger('pdvStopa'),
      validator.validateStringLength('pdvOpis', 120),
      validator.validateBoolean('isDefault'),
      validator.validateInteger('fisPdv'),
    ];
  }
}

module.exports = ArtPdv;
