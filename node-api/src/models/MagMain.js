const Model = require('./Model');
const { validator } = require('../utils');

const modelConfig = {
  tableName: 'mp_mag_main',
  keys: [
    'id',
    'vPromet',
    'sifra',
    'magNaziv',
    'kepuNaziv',
    'kepuMesto',
    'opis',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class MagMain extends Model {
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
      validator.validateVPromet(),
      validator.validateStringLength('sifra', 12),
      validator.validateStringLength('magNaziv', 60),
      validator.validateOptionalStringLength('kepuNaziv', 60),
      validator.validateOptionalStringLength('kepuMesto', 60),
      validator.validateOptionalText('opis'),
    ];
  }
}

module.exports = MagMain;
