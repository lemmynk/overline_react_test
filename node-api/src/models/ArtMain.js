const Model = require('./Model');
const ArtGrupa = require('./ArtGrupa');
const ArtPdv = require('./ArtPdv');
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
