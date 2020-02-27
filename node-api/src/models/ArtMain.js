const Model = require('./Model');
const ArtGrupa = require('./ArtGrupa');
const ArtPdv = require('./ArtPdv');
const AppConfig = require('./AppConfig');
const { validator } = require('../utils');

const modelConfig = {
  tableName: 'mp_art_main',
  keys: [
    'id',
    'vArtikl',
    'grpId',
    'intSifra',
    // 'barkod',
    'artNaziv',
    'mera',
    'pdvId',
    // 'pdvStopa',
    // 'proizvodjac',
    // 'opis',
    // 'cenaMp',
    // 'cenaPopust',
    // 'cenaPrikaz',
    // 'prodSuma',
    // 'fisLocked',
    // 'fisCena',
    // 'grpNaziv',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class ArtMain extends Model {
  constructor(props) {
    super(props, modelConfig);
    // this.searchFields = ['intSifra', 'artNaziv'];
  }

  /**
   * Default values for new model
   *
   * @return {Promise}
   */
  static init(reqQuery) {
    const { vArtikl } = reqQuery;

    return AppConfig.find({ name: 'artMainInitForm' })
      .then(response => response.value)
      .then(value => JSON.parse(value))
      .then(value => value[vArtikl || process.env.ARTIKL_ROBA])
      .then(data => ({ ...data, ...reqQuery }));
  }

  /**
   * Validate params provided using express-validator
   *
   * @return {Array}
   */
  static validate() {
    return [
      validator.validateVArtikl(),
      validator.validateParent('grpId', ArtGrupa),
      validator.validateParent('pdvId', ArtPdv),
      validator.validateStringLength('artNaziv', 120),
      validator.validateStringLength('intSifra', 20),
      validator.validateStringLength('mera', 20),
    ];
  }
}

module.exports = ArtMain;
