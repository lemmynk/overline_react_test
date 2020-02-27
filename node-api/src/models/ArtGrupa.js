const Model = require('./Model');
const ArtMainView = require('./ArtMainView');
const { validator } = require('../utils');

const modelConfig = {
  tableName: 'mp_art_grupa',
  keys: [
    'id',
    'vArtikl',
    'grpNaziv',
    'grpSifra',
    // 'redosled',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class ArtGrupa extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  /**
   * Default values for new model
   *
   * @return {Promise}
   */
  static init(reqQuery) {
    return Promise.resolve({ vArtikl: process.env.ARTIKL_ROBA, ...reqQuery });
  }

  /**
   * Validate params provided using express-validator
   *
   * @return {Array}
   */
  static validate() {
    return [
      validator.validateVArtikl(),
      validator.validateStringLength('grpNaziv', 120),
      validator.validateStringLength('grpSifra', 20),
    ];
  }

  /**
   * Validate should Model be deleted
   *
   * @return {Array}
   */
  static canDelete() {
    return [validator.validateNoChildren('id', ArtMainView, 'grpId')];
  }
}

module.exports = ArtGrupa;
