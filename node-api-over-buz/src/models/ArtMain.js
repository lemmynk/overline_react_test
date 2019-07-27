const { Model } = require('@newtash/node-api-core');

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
  }

  /**
   * Validate params provided
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static validate(params) {
    this.clearValidationErrors()
      .validateRequired(
        [
          'vArtikl',
          'grpId',
          'intSifra',
          // 'barkod',
          'artNaziv',
          'mera',
          'pdvId',
        ],
        params,
      )
      .validateStringLength(params, 'intSifra', 20)
      // .validateStringLength(params, 'barkod', 20)
      .validateStringLength(params, 'artNaziv', 120)
      .validateStringLength(params, 'mera', 20);
    // .validateStringLength(params, 'proizvodjac', 20)
    // .validateStringLength(params, 'grpNaziv', 60);
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = ArtMain;
